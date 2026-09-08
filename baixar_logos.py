import os
import requests

casas = {
    "betano": "betano.bet.br",
    "bet365": "bet365.bet.br",
    "superbet": "superbet.bet.br",
    "sportingbet": "sportingbet.bet.br",
    "novibet": "novibet.bet.br",
    "pixbet": "pixbet.bet.br",
    "betnacional": "betnacional.bet.br",
    "vaidebet": "vaidebet.bet.br",
    "obabet": "obabet.bet.br",
    "betpix365": "betpix365.bet.br",
    "jogajunto": "jogajunto.bet.br",
    "bra": "bra.bet.br",
}

pasta = "assets/bets"
os.makedirs(pasta, exist_ok=True)

for nome, dominio in casas.items():
    url = f"https://www.google.com/s2/favicons?domain={dominio}&sz=256"

    try:
        resposta = requests.get(url, timeout=15)

        if resposta.status_code == 200:
            arquivo = os.path.join(pasta, f"{nome}.png")

            with open(arquivo, "wb") as f:
                f.write(resposta.content)

            print(f"✓ {nome}")
        else:
            print(f"✗ Erro em {nome}")

    except Exception as erro:
        print(f"✗ {nome}: {erro}")

print("\nDownload concluído.")
print(f"Logos salvas em: {pasta}")
