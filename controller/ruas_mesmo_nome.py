import requests

chave_api = '86cad90df84c46639442c280fb21d491'  # Substitua pela sua chave de API do OpenCage


def obter_coordenadas(endereco, cidade, estado, chave_api):
    base_url = 'https://api.opencagedata.com/geocode/v1/json'
    params = {
        'q': f'{endereco}, {cidade}, {estado}',
        'key': chave_api,
        'countrycode': 'BR'  # Código do país (BR para Brasil)
    }

    try:
        response = requests.get(base_url, params=params)
        if response.status_code == 200:
            data = response.json()
            if 'results' in data and len(data['results']) > 0:
                result = data['results'][0]
                latitude = result['geometry']['lat']
                longitude = result['geometry']['lng']
                return latitude, longitude
            else:
                print("Nenhum resultado encontrado.")
        else:
            print(f"Erro na requisição: {response.status_code}")
    except Exception as e:
        print(f"Erro: {str(e)}")

# Exemplo de uso
endereco = 'Rua Vasco da Gama'
cidade = 'São Paulo'
estado = 'SP'

coordenadas = obter_coordenadas(endereco, cidade, estado, chave_api)
if coordenadas:
    latitude, longitude = coordenadas
    print(f"Latitude: {latitude}")
    print(f"Longitude: {longitude}")
