from geopy.geocoders import Nominatim
import json
import geopy.exc

def coordenadas_por_endereco(rua,cidade,estado):
    endereco = f"{rua}-{cidade}-{estado}"
    print(endereco)

    geolocator = Nominatim(user_agent="roteirizacao")
    location = geolocator.geocode(endereco)
    if location:
        return location.latitude, location.longitude
    return None, None

# coletas = [
#     {"cep": "rua nova veneza - cumbica - guarulhos-sp", "numero": "1", "outros_dados": "Dados 1"},
#     {"cep": "rua branquinha - guarulhos-sp", "numero": "2", "outros_dados": "Dados 2"},
#     {"cep": "rua sume cumbica guarulhos-sp", "numero": "3", "outros_dados": "Dados 2"},
#     {"cep": "av santos dumont cumbica guarulhos-sp", "numero": "4", "outros_dados": "Dados 2"},
# ]

# lista_coletas = []

# for coleta in coletas:
#     try:
#         latitude, longitude = coordenadas_por_endereco(coleta["cep"])
#         if latitude and longitude:

#             lista_coletas.append({
#                 "lat": latitude,
#                 "lng": longitude,
#                 "numero_coleta": coleta["numero"],
#                 "outros_dados": coleta["outros_dados"]
#             })
#     except geopy.exc.GeocoderTimedOut:
#         print(f"Timeout para o CEP: {coleta['cep']}")

# # Converter o dicionário em uma string JSON
# data = json.dumps(lista_coletas)

# # Salvar os dados no arquivo JavaScript
# with open("coletas.js", "w") as js_file:
#     js_file.write(f"var coletasData = {data};")