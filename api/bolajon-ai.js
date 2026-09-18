export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Faqat POST so'rov qabul qilinadi"
    });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY Vercel'da topilmadi"
    });
  }

  try {
    const {
      action = "chat",
      message = "",
      history = [],
      fileData = "",
      mimeType = ""
    } = req.body || {};

    /* =========================
       1. RASM YARATISH
    ========================= */

    if (action === "image") {
      if (!message.trim()) {
        return res.status(400).json({
          error: "Rasm uchun tavsif yozing"
        });
      }

      const imagePrompt = `
Sen Bolajon AI uchun rasm yaratuvchi yordamchisan.

Rasm:
- bolalar uchun mos;
- quvnoq;
- chiroyli;
- ta'limiy;
- xavfsiz;
- toza va professional bo'lsin.

Bolajonlar ilovasining uslubiga mos:
- yumshoq ranglar;
- premium bolalar ta'lim ilovasi ko'rinishi;
- knitted / crochet / yarn texture;
- yoqimli dekorativ elementlar.

Odamlar, yuzlar, ko'zlar va hayvonlarni faqat foydalanuvchi aniq so'rasa ishlat.
Qo'rqinchli yoki zo'ravon kontent yaratma.

Foydalanuvchi so'rovi:
${message}
`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/interactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY
          },
          body: JSON.stringify({
            model: "gemini-3.1-flash-image",
            input: imagePrompt,
            response_format: {
              type: "image",
              mime_type: "image/png",
              aspect_ratio: "1:1",
              image_size: "1K"
            }
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          error:
            data?.error?.message ||
            "Rasm yaratishda xatolik yuz berdi"
        });
      }

      return res.status(200).json({
        type: "image",
        answer:
          data?.output_text ||
          "Rasm tayyor bo'ldi.",
        image: data?.output_image
          ? {
              mimeType:
                data.output_image.mime_type ||
                "image/png",
              data: data.output_image.data
            }
          : null
      });
    }

    /* =========================
       2. CHAT / RASM / PDF
    ========================= */

    const input = [];

    /*
      Oldingi suhbatni Gemini'ga beramiz.
      Bu Bolajon AI'ni oddiy bir martalik chatbot emas,
      davomli suhbatga yaqin ishlashiga yordam beradi.
    */

    if (Array.isArray(history) && history.length) {
      const previousMessages = history
        .slice(-12)
        .map(item => {
          const role =
            item?.role === "assistant"
              ? "Bolajon AI"
              : "Bola";

          return `${role}: ${String(
            item?.content || ""
          )}`;
        })
        .join("\n");

      if (previousMessages) {
        input.push({
          type: "text",
          text:
            "Oldingi suhbat:\n" +
            previousMessages
        });
      }
    }

    /* =========================
       3. FAYL / RASM
    ========================= */

    if (fileData && mimeType) {
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/heic",
        "image/heif",
        "application/pdf"
      ];

      if (!allowedTypes.includes(mimeType)) {
        return res.status(400).json({
          error:
            "Bu fayl turi hozircha qo'llab-quvvatlanmaydi."
        });
      }

      if (mimeType === "application/pdf") {
        input.push({
          type: "document",
          mime_type: mimeType,
          data: fileData
        });
      } else {
        input.push({
          type: "image",
          mime_type: mimeType,
          data: fileData
        });
      }
    }

    /* =========================
       4. BOLAJON AI QOIDALARI
    ========================= */

    input.push({
      type: "text",
      text: `
Sen "Bolajon AI" yordamchisisan.

Asosiy til:
- o'zbek tili.

Uslub:
- mehribon;
- sodda;
- qisqa;
- bolaga tushunarli;
- ta'limiy;
- rag'batlantiruvchi.

Muhim:
- Bola xato qilsa koyima.
- "Sen bilmaysan" yoki shunga o'xshash salbiy gaplardan foydalanma.
- Javobni imkon qadar sodda tushuntir.
- Kerak bo'lsa misol ber.
- Bolaga mos bo'lmagan kontentga yordam berma.

Agar rasm yuborilgan bo'lsa:
- rasmni tahlil qil;
- undagi yozuv, obyekt yoki topshiriqni tushuntir.

Agar PDF yuborilgan bo'lsa:
- hujjat mazmunini tahlil qil;
- savolga hujjat asosida javob ber;
- kerak bo'lsa qisqacha mazmun qil;
- kerak bo'lsa test yoki mashq tuz.

Foydalanuvchi savoli:
${message || "Yuborilgan materialni tushuntirib ber."}
`
    });

    /* =========================
       5. GEMINI CHAT
    ========================= */

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY
        },
        body: JSON.stringify({
          model: "gemini-3.8-flash",
          input
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "Gemini API xatosi"
      });
    }

    /* =========================
       6. JAVOBNI OLISH
    ========================= */

    let answer = "";

    if (data?.output_text) {
      answer = data.output_text;
    }

    if (!answer && Array.isArray(data?.steps)) {
      for (const step of data.steps) {
        if (step?.type !== "model_output") continue;

        for (const item of step.content || []) {
          if (item?.type === "text") {
            answer += item.text || "";
          }
        }
      }
    }

    return res.status(200).json({
      type:
        mimeType === "application/pdf"
          ? "pdf"
          : mimeType
          ? "image"
          : "chat",

      answer:
        answer.trim() ||
        "Kechirasiz, hozircha javob bera olmadim."
    });

  } catch (error) {
    console.error("Bolajon AI:", error);

    return res.status(500).json({
      error:
        "Bolajon AI serverida xatolik yuz berdi."
    });
  }
        }
