import JSZip from "jszip";
import path from "path";
import { readFile } from "fs/promises";

export const dynamic = "force-dynamic";

const profile = {
  name: "Ari Anggara",
  role: "Graphic Designer / Commercial Visual Artist",
  city: "Cirebon",
  age: "24 Tahun",
  birth: "Cirebon, 18 September 2001",
  address: "Talun, Cempaka, Jl. Raden Cempah 1, Cirebon 45171",
  gps: "-6.7431002, 108.5114999",
  wa: "087847386701",
  facebook: "Ari Anggara",
  tiktok: "@arianggaraar",
  email: "arianggaraar@gmail.com",
  manifesto:
    "Portfolio-CV eksperimental untuk desain komersial, campaign identity, visual promosi, dan creative advertising. Dibangun sebagai creative dossier: lebih editorial, lebih tajam, dan tidak terasa seperti template CV generik.",
  positioning:
    "Ari memosisikan diri sebagai visual designer yang kuat di layout promosi, poster komersial, identitas kampanye, dan presentasi visual untuk brand yang butuh komunikasi cepat, rapi, dan berkarakter.",
  focus: [
    "Commercial poster dan banner promosi",
    "Campaign identity untuk brand, event, dan publik",
    "Social media ads / feed visual / launch material",
    "Invitation design premium untuk wedding atau event",
    "Brand kit, stationery, dan visual guideline ringan",
  ],
  strengths: [
    "Mengutamakan hierarki: headline, visual utama, CTA, lalu detail pendukung.",
    "Komposisi anti-template: grid asimetris, ruang negatif, dan aksen brutalist yang terkontrol.",
    "Mampu menyesuaikan mood visual dari neon-retail, luxury invitation, corporate, sampai public campaign.",
    "Siap membuat asset turunan untuk digital maupun cetak: cover, banner, poster, story, feed, dan presentation slide.",
  ],
  workflow: [
    "Brief tujuan komunikasi dan target audiens",
    "Riset referensi visual serta positioning brand",
    "Moodboard dan arah warna/tipografi",
    "Eksplorasi layout utama dan alternatif visual",
    "Refinement detail, readability, CTA, dan export final",
  ],
  software: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere", "Canva"],
};

const projects = [
  ["NB-01", "Produk", "Neon Beast Energy Drink", "Banner promosi penjualan produk retail dengan visual 3D pop-out.", "Hero product, splash effect, CTA retail, premium dark neon."],
  ["BF-02", "Diskon", "Black Friday Cyber Sale", "Desain ads retail e-commerce dengan tipografi kinetik.", "Big-number offer, cyber commerce, urgency, shopping CTA."],
  ["RH-03", "Undangan", "The Royal Heritage Wedding", "Undangan digital premium dengan aksen batik Cirebon modern.", "Luxury invitation, batik Cirebon accent, gold editorial frame."],
  ["EM-04", "Hari Spesial", "Eid Mubarak Canvas Identity", "Ucapan hari besar korporat dengan teknik vector-shading.", "Festive corporate greeting, Islamic geometry, refined green-gold mood."],
  ["AM-05", "Perusahaan", "Astra Media Rebranding", "Corporate identity kit, logo, dan panduan warna.", "Brand system, stationery mockup, palette, type direction."],
  ["SM-06", "Politik", "Suara Muda 2029 Campaign", "Poster komunikasi politik dan infografis publik berbasis tipografi berani.", "Public campaign, bold typography, statistic panels, youth message."],
  ["VS-07", "Produk", "Volta Sneakers Launch", "Instagram feed layout untuk peluncuran sepatu lokal.", "Streetwear product launch, motion texture, local brand energy."],
  ["QY-08", "Produk", "SmartHub QYEN Launch Promo", "Poster promosi smart-home untuk SmarthubQyen dengan fokus dashboard, automation, dan monitoring energi.", "Smart home UI, device cards, energy monitoring, premium QYEN system."],
  ["GC-09", "Undangan", "Gala Creative Night 2026", "Tiket dan undangan fisik konser musik luring eksklusif.", "Exclusive ticket system, event identity, premium nightlife texture."],
  ["MC-10", "Hari Spesial", "Merdeka Creative Campaign", "Visual kemerdekaan RI bergaya pop-art untuk brand FnB.", "Independence campaign, pop-art illustration, FnB seasonal promo."],
  ["QS-11", "Perusahaan", "QYEN Studio Stationery", "Desain kartu nama, amplop, dan merchandise kreatif.", "Stationery suite, black-lime branding, identity extension."],
  ["GC-12", "Politik", "Green City Manifesto", "Kampanye lingkungan hidup untuk poster baliho daerah.", "Environmental billboard, civic message, green public movement."],
];

const rows = projects
  .map(
    ([code, category, title, desc, direction], idx) => `
      <tr>
        <td>${String(idx + 1).padStart(2, "0")}</td>
        <td>${code}</td>
        <td>${category}</td>
        <td><strong>${title}</strong></td>
        <td>${desc}<br /><small>${direction}</small></td>
      </tr>`
  )
  .join("");

const docHtml = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Ari Anggara — Creative Dossier</title>
<style>
*{box-sizing:border-box} body{margin:0;background:#111;color:#f4ecd8;font-family:Arial,Helvetica,sans-serif} .page{max-width:1180px;margin:0 auto;padding:44px}.sheet{border:2px solid #f4ecd8;background:#171411;box-shadow:14px 14px 0 #b9ff00}.hero{display:grid;grid-template-columns:1.15fr .85fr;gap:28px;padding:40px;border-bottom:2px solid #f4ecd8}.eyebrow{display:inline-block;background:#b9ff00;color:#111;padding:10px 14px;border:2px solid #f4ecd8;font-weight:900;text-transform:uppercase;letter-spacing:2px;font-size:12px}.title{font-size:92px;line-height:.78;letter-spacing:-7px;text-transform:uppercase;margin:22px 0 18px;font-weight:900}.manifesto{font-size:22px;line-height:1.28;border-left:14px solid #b9ff00;padding-left:18px;margin:0}.box{border:2px solid #f4ecd8;padding:20px;background:#111}.box p{margin:0 0 10px;line-height:1.45}.grid{display:grid;grid-template-columns:.72fr 1.28fr}.aside{border-right:2px solid #f4ecd8;padding:32px;background:#14110f}.content{padding:32px}h2{margin:0 0 16px;text-transform:uppercase;font-size:22px;letter-spacing:2px;border-bottom:2px solid #f4ecd8;padding-bottom:10px}.block{margin-bottom:28px}li{margin-bottom:9px;line-height:1.45}.tags{display:flex;flex-wrap:wrap;gap:8px}.tag{border:2px solid #f4ecd8;padding:9px 12px;font-size:12px;font-weight:900;text-transform:uppercase}.tag.accent{background:#b9ff00;color:#111;border-color:#b9ff00}table{width:100%;border-collapse:collapse}td,th{border:1px solid #f4ecd8;padding:10px;vertical-align:top;font-size:13px;line-height:1.4}th{background:#f4ecd8;color:#111;text-transform:uppercase;letter-spacing:1px}small{display:block;margin-top:4px;color:#b9ff00}.footer{border-top:2px solid #f4ecd8;padding:24px 32px;color:#f4ecd8;font-size:13px;letter-spacing:.2px}
</style>
</head>
<body>
<main class="page"><section class="sheet">
<div class="hero"><div><span class="eyebrow">Break The Mold Visual CV</span><h1 class="title">Ari<br/>Anggara</h1><p class="manifesto">${profile.manifesto}</p></div><div class="box"><p><strong>${profile.role}</strong></p><p>${profile.age} — ${profile.birth}</p><p>${profile.address}</p><p>GPS: ${profile.gps}</p><p>WA: ${profile.wa}</p><p>Facebook: ${profile.facebook}</p><p>TikTok: ${profile.tiktok}</p><p>Email/GitHub: ${profile.email}</p></div></div>
<div class="grid"><aside class="aside"><div class="block"><h2>Fokus</h2><ul>${profile.focus.map((x) => `<li>${x}</li>`).join("")}</ul></div><div class="block"><h2>Kekuatan</h2><ul>${profile.strengths.map((x) => `<li>${x}</li>`).join("")}</ul></div><div class="block"><h2>Software</h2><div class="tags">${profile.software.map((x,i)=>`<span class="tag ${i===0?'accent':''}">${x}</span>`).join("")}</div></div></aside>
<section class="content"><div class="block"><h2>Positioning</h2><p style="line-height:1.55;margin:0">${profile.positioning}</p></div><div class="block"><h2>Workflow</h2><ol>${profile.workflow.map((x)=>`<li>${x}</li>`).join("")}</ol></div><div class="block"><h2>12 Album Portfolio</h2><table><thead><tr><th>No</th><th>Kode</th><th>Kategori</th><th>Judul</th><th>Arah Visual</th></tr></thead><tbody>${rows}</tbody></table></div></section></div>
<div class="footer">Creative dossier ini dibuat untuk pengiriman profil desain, pitch portofolio, dan lampiran kreatif yang lebih kuat daripada CV generik.</div>
</section></main>
</body></html>`;

const txt = `${profile.name}\n${profile.role}\n\n${profile.manifesto}\n\nDATA\nUsia: ${profile.age}\nLahir: ${profile.birth}\nAlamat: ${profile.address}\nGPS: ${profile.gps}\nWA: ${profile.wa}\nFacebook: ${profile.facebook}\nTikTok: ${profile.tiktok}\nEmail/GitHub: ${profile.email}\n\nPOSITIONING\n${profile.positioning}\n\nFOKUS\n${profile.focus.map((x)=>`- ${x}`).join("\n")}\n\nKEKUATAN\n${profile.strengths.map((x)=>`- ${x}`).join("\n")}\n\nWORKFLOW\n${profile.workflow.map((x,i)=>`${i+1}. ${x}`).join("\n")}\n\n12 ALBUM\n${projects.map(([code,cat,title,desc,dir],i)=>`${String(i+1).padStart(2,"0")} ${code} | ${cat} | ${title}\n   ${desc}\n   Direction: ${dir}`).join("\n")}`;

function escapePdfText(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function makePdfBuffer() {
  const pages = [
    [
      ["ARI ANGGARA - CREATIVE DOSSIER", 24],
      [profile.role, 13],
      ["", 10],
      ["MANIFESTO", 16],
      ["Portfolio-CV eksperimental untuk desain komersial, campaign identity,", 11],
      ["visual promosi, dan creative advertising yang tidak terasa template.", 11],
      ["", 10],
      ["DATA", 16],
      [`Usia: ${profile.age} | Lahir: ${profile.birth}`, 11],
      [`Alamat: ${profile.address}`, 11],
      [`GPS: ${profile.gps}`, 11],
      [`WA: ${profile.wa} | TikTok: ${profile.tiktok}`, 11],
      [`Email/GitHub: ${profile.email}`, 11],
      ["", 10],
      ["FOKUS KERJA", 16],
      ...profile.focus.map((x) => [`- ${x}`, 11]),
      ["", 10],
      ["SOFTWARE", 16],
      [profile.software.join(" | "), 11],
    ],
    [
      ["12 ALBUM PORTFOLIO", 18],
      ...projects.map(([code, category, title]) => [`${code} | ${category} | ${title}`, 10]),
      ["", 10],
      ["WORKFLOW", 16],
      ...profile.workflow.map((x, i) => [`${i + 1}. ${x}`, 11]),
      ["", 10],
      ["POSITIONING", 16],
      ["Visual designer untuk promosi, brand kit, event material, social ads,", 11],
      ["dan komunikasi campaign yang butuh hierarchy kuat serta layout premium.", 11],
    ],
  ];

  const buildStream = (lines) => {
    let stream = "BT\n/F1 24 Tf\n44 758 Td\n";
    lines.forEach(([line, size], idx) => {
      if (idx === 0) stream += `(${escapePdfText(line)}) Tj\n`;
      else {
        const gap = line === "" ? 16 : size >= 16 ? 26 : 16;
        stream += `/F1 ${size} Tf\n0 -${gap} Td\n(${escapePdfText(line)}) Tj\n`;
      }
    });
    stream += "ET\n";
    return stream;
  };

  const streams = pages.map(buildStream);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 7 0 R >> >> >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 6 0 R /Resources << /Font << /F1 7 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(streams[0], "utf8")} >>\nstream\n${streams[0]}endstream`,
    `<< /Length ${Buffer.byteLength(streams[1], "utf8")} >>\nstream\n${streams[1]}endstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Root 1 0 R /Size ${objects.length + 1} >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, "utf8");
}

async function addAlbumImages(zip) {
  const folder = zip.folder("Album-Artworks-WebP");
  for (let i = 1; i <= 12; i++) {
    const filename = `album-${String(i).padStart(2, "0")}.webp`;
    const filepath = path.join(process.cwd(), "public", "albums", filename);
    try {
      const file = await readFile(filepath);
      folder.file(filename, file);
    } catch {}
  }
}

export async function GET() {
  const zip = new JSZip();
  const csv = [
    "No,Kode,Kategori,Judul,Deskripsi,Arah Visual",
    ...projects.map(([code, cat, title, desc, dir], i) => `${i + 1},${code},${cat},"${title}","${desc}","${dir}"`),
  ].join("\n");

  zip.file("01_Ari-Anggara_Creative-Dossier.pdf", makePdfBuffer());
  zip.file("02_Ari-Anggara_Editorial-Resume.doc", docHtml);
  zip.file("03_Ari-Anggara_Office-Resume.html", docHtml);
  zip.file("04_Ari-Anggara_Portfolio-Specification.txt", txt);
  zip.file("05_Ari-Anggara_Project-Catalogue.csv", csv);
  zip.file("06_Ari-Anggara_Creative-Dossier.html", docHtml);
  await addAlbumImages(zip);

  const buffer = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 6 } });
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="Ari-Anggara-Creative-Resume-Kit.zip"',
      "Cache-Control": "no-store",
    },
  });
}
