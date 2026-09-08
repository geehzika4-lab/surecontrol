import os
import re
import requests
from urllib.parse import urljoin

PASTA = "assets/bets"
ARQ_FALTANDO = "logos_faltando.txt"

headers = {
    "User-Agent": "Mozilla/5.0"
}

with open(ARQ_FALTANDO, encoding="utf-8") as f:
    dominios = [x.strip() for x in f if x.strip()]

print(f"Tentando recuperar {len(dominios)} logos...\n")

for i, dominio in enumerate(dominios, 1):
    nome = dominio.replace(".bet.br", "")
    destino = os.path.join(PASTA, f"{nome}.png")

    if os.path.exists(destino):
        print(f"[{i}/{len(dominios)}] Já existe: {dominio}")
        continue

    site = f"https://{dominio}"

    try:
        r = requests.get(site, headers=headers, timeout=20, allow_redirects=True)

        html = r.text

        candidatos = []

        # procura tags link com icon
        links = re.findall(
            r'<link[^>]+(?:rel=["\'][^"\']*(?:icon|apple-touch-icon)[^"\']*["\'])[^>]*>',
            html,
            flags=re.I
        )

        for tag in links:
            m = re.search(r'href=["\']([^"\']+)["\']', tag, flags=re.I)
            if m:
                candidatos.append(urljoin(r.url, m.group(1)))

        # fallbacks comuns
        candidatos += [
            urljoin(r.url, "/apple-touch-icon.png"),
            urljoin(r.url, "/favicon-192x192.png"),
            urljoin(r.url, "/favicon-96x96.png"),
            urljoin(r.url, "/favicon.png"),
            urljoin(r.url, "/favicon.ico"),
        ]

        baixou = False

        for url in candidatos:
            try:
                img = requests.get(
                    url,
                    headers=headers,
                    timeout=15,
                    allow_redirects=True
                )

                tipo = img.headers.get("content-type", "").lower()

                if (
                    img.status_code == 200
                    and len(img.content) > 500
                    and ("image" in tipo or url.endswith((".png", ".ico", ".jpg", ".jpeg", ".webp")))
                ):
                    with open(destino, "wb") as f:
                        f.write(img.content)

                    print(f"[{i}/{len(dominios)}] ✓ {dominio}")
                    baixou = True
                    break

            except:
                pass

        if not baixou:
            print(f"[{i}/{len(dominios)}] ✗ {dominio}")

    except Exception as erro:
        print(f"[{i}/{len(dominios)}] ✗ {dominio} - {erro}")

print("\nRECUPERAÇÃO FINALIZADA")
