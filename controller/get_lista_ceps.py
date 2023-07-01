import PyPDF2

def extrair_digitos(linha):
    palavras = linha.split()
    for palavra in palavras:
        if len(palavra) >= 8:
            return palavra[:8]
    return ""


def ler_linha_pdf(nome_arquivo, numero_linha):
    with open(nome_arquivo, 'rb') as arquivo_pdf:
        leitor = PyPDF2.PdfReader(arquivo_pdf)
        total_paginas = len(leitor.pages)

        if numero_linha < 1:
            raise ValueError('Número de linha inválido.')

        linhas = []
        for pagina_num in range(total_paginas):
            pagina = leitor.pages[pagina_num]
            linhas_pagina = pagina.extract_text().split('\n')

            if numero_linha <= len(linhas_pagina):
                linha = extrair_digitos(linhas_pagina[numero_linha - 1])
                linhas.append(linha)

        return linhas

# Exemplo de uso
arquivo_pdf = 'coletas.pdf'
numero_linha = 7

linhas = ler_linha_pdf(arquivo_pdf, numero_linha)

print(linhas)

for linha in linhas:
    print(linha)


