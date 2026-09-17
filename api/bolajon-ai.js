module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Faqat POST so'rov qabul qilinadi." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY Vercel'da sozlanmagan." });
  }

  try {
    const { message, history = [] } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Savol yuborilmadi." });
    }

    const safeHistory = Array.isArray(history)
      ? history.slice(-12).filter(x => x && (x.role === "user" || x.role === "assistant") && typeof x.content === "string")
      : [];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        instructions: `Siz Bolajon AI — o'zbek tilida bolalarga o'qishda yordam beradigan mehribon yordamchisiz.
Javoblarni sodda, qisqa va bola tushunadigan o'zbek tilida yozing.
Ta'limiy savollarga yordam bering: harflar, sonlar, ranglar, shakllar, tabiat, mevalar va boshqa maktabgacha ta'lim mavzulari.
Bolani qo'rqitmang, haqorat qilmang va zararli yoki nomaqbul mazmun bermang.
Agar savol bola uchun mos bo'lmasa, muloyim ravishda xavfsiz mavzuga yo'naltiring.
Kerak bo'lsa emoji ishlating, lekin haddan tashqari ko'p emas.`,
        input: safeHistory.map(x => `${x.role === "user" ? "Bola" : "Bolajon AI"}: ${x.content}`).join("\n\n"),
        max_output_tokens: 300
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: "OpenAI so'rovi bajarilmadi." });
    }

    const answer = data.output_text || (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n");

    return res.status(200).json({ answer: answer || "Hozircha javob bera olmadim." });
  } catch (error) {
    return res.status(500).json({ error: "Serverda xatolik yuz berdi." });
  }
}
