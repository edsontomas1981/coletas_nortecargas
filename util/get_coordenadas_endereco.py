import requests

def coordenadas_por_endereco(endereco, cidade, estado):
    chave_api = '86cad90df84c46639442c280fb21d491'
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
                results = data['results']
                street_scores = {}
                for result in results:
                    street = result['components'].get('road', '')
                    relevance = result.get('confidence', 0) + result.get('accuracy', 0)
                    if street:
                        if street in street_scores:
                            if relevance > street_scores[street]:
                                street_scores[street] = relevance
                        else:
                            street_scores[street] = relevance

                if street_scores:
                    sorted_streets = sorted(street_scores, key=street_scores.get, reverse=True)
                    most_relevant_street = sorted_streets[0]
                    for result in results:
                        if result['components'].get('road') == most_relevant_street:
                            latitude = result['geometry']['lat']
                            longitude = result['geometry']['lng']
                            return latitude, longitude

            print("Nenhum resultado encontrado.")
        else:
            print(f"Erro na requisição: {response.status_code}")
    except Exception as e:
        print(f"Erro: {str(e)}")



# import requests

# def coordenadas_por_endereco(endereco, cidade, estado):
#     chave_api = '86cad90df84c46639442c280fb21d491'
#     base_url = 'https://api.opencagedata.com/geocode/v1/json'
#     params = {
#         'q': f'{endereco}, {cidade}, {estado}',
#         'key': chave_api,
#         'countrycode': 'BR'  # Código do país (BR para Brasil)
#     }

#     try:
#         response = requests.get(base_url, params=params)
#         if response.status_code == 200:
#             data = response.json()
#             if 'results' in data and len(data['results']) > 0:
#                 result = data['results'][0]
#                 latitude = result['geometry']['lat']
#                 longitude = result['geometry']['lng']
#                 return latitude, longitude
#             else:
#                 print("Nenhum resultado encontrado.")
#         else:
#             print(f"Erro na requisição: {response.status_code}")
#     except Exception as e:
#         print(f"Erro: {str(e)}")
