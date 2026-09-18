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
      fileData = "",
      mimeType = ""
    } = req.body || {};

    /*
    ==================================================
    BOLAJON AI — RASM YARATISH
    ==================================================
    */

    if (action === "image") {
      if (!message.trim()) {
        return res.status(400).json({
          error: "Rasm uchun tavsif yozing"
        });
      }

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

            input: [
              {
                type: "text",
                text:
                  "Create a beautiful, high-quality educational image for children. " +
                  "Make it colorful, friendly and visually clear. " +
                  "Avoid scary, violent or inappropriate content. " +
                  "User request: " +
                  message
              }
            ],

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
        answer: "Rasm tayyor bo'ldi.",
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

    /*
    ==================================================
    BOLAJON AI — CHAT / RASM / PDF
    ==================================================
    */

    const input = [];

    /*
    RASM
    */

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
          type: "file",
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

    /*
    AI KO'RSATMASI
    */

    const prompt = `
Sen Bolajon AI yordamchisisan.

Javoblaring:
- o'zbek tilida bo'lsin;
- bolalarga tushunarli bo'lsin;
- mehribon va qisqa bo'lsin;
- ta'limiy bo'lsin;
- bola xato qilsa, koyima;
- kerak bo'lsa oddiy misol bilan tushuntir.

Agar rasm yuborilgan bo'lsa:
- rasmni tahlil qil;
- undagi obyektlar, yozuvlar yoki topshiriqni tushuntir.

Agar PDF yuborilgan bo'lsa:
- uning mazmunini tahlil qil;
- savollarga hujjat asosida javob ber;
- kerak bo'lsa qisqacha mazmun yoki test tuz.

Foydalanuvchi savoli:
${message || "Yuborilgan faylni tushuntirib ber."}
`;

    input.push({
      type: "text",
      text: prompt
    });

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

    let answer = "";

    if (data?.output_text) {
      answer = data.output_text;
    } else if (Array.isArray(data?.steps)) {
      for (const step of data.steps) {
        if (step?.type === "model_output") {
          for (const item of step.content || []) {
            if (item?.type === "text") {
              answer += item.text || "";
            }
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
        "Kechirasiz, hozir javob bera olmadim."
    });

  } catch (error) {
    console.error("Bolajon AI:", error);

    return res.status(500).json({
      error: "Bolajon AI serverida xatolik yuz berdi."
    });
  }
}
