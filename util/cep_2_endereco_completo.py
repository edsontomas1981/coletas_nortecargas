import requests
import json

def lat_long(cep):
	url = f"https://www.cepaberto.com/api/v3/cep?cep={cep}"
	# O seu token está visível apenas pra você'
	headers = {'Authorization': 'Token token=9694a0f2a38cc8452280859c054627ed'}
	response = requests.get(url, headers=headers)

	return response.json()
