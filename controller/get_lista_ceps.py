import PyPDF2

import re

def extrair_digitos(linha):
    palavras = linha.split()
    for palavra in palavras:
        if len(palavra) >= 8:
            digitos = re.sub(r'[^0-9]', '', palavra[:9])
            return digitos
    return ""

def extrair_coleta(linha):
    palavras = linha.split()
    return palavras[10]

def extrair_dados_coleta(linha):
    palavras = linha.split()
    return palavras[3],palavras[5]

def ler_linha_pdf(endereco_arquivo):
    nome_arquivo = endereco_arquivo
    numero_linha = 7

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
                coleta = extrair_coleta(linhas_pagina[0])
                volume,peso = extrair_dados_coleta(linhas_pagina[13])

                if linha:
                    linhas.append({'cep':linha,'coleta':coleta,'volumes':volume,
                                   'peso':peso})
        return linhas