import os
import re
import requests

URL = "https://www.gov.br/fazenda/pt-br/internet/elias-testes-spa/empresas-autorizadas-1/empresas-autorizadas"

PASTA = "assets/bets"
os.makedirs(PASTA, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0"
}

print("Baixando lista oficial...")

html = requests.get(URL, headers=headers, timeout=30).text

dominios = sorted(set(
    re.findall(r'[a-zA-Z0-9.-]+\.bet\.br', html)
))

print(f"Foram encontrados {len(dominios)} dominios.\n")

for dominio in dominios:
    nome = dominio.replace(".bet.br", "")
    nome = re.sub(r"[^a-zA-Z0-9_-]", "_", nome)

    url_logo = (
        f"https://www.google.com/s2/favicons?"
        f"domain={dominio}&sz=256"
    )

    try:
        resposta = requests.get(
            url_logo,
            headers=headers,
            timeout=20
        )

        if resposta.status_code == 200 and len(resposta.content) > 100:
            caminho = os.path.join(PASTA, f"{nome}.png")

            with open(caminho, "wb") as arquivo:
                arquivo.write(resposta.content)

            print(f"✓ {nome}")

        else:
            print(f"✗ {nome}")

    except Exception as erro:
        print(f"✗ {nome}: {erro}")

print("\n==============================")
print("DOWNLOAD FINALIZADO")
print("==============================")
print(f"Total encontrado: {len(dominios)}")
print(f"Pasta: {PASTA}")
