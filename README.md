## bis2bis

rotas:
	- universities:
###
			getAll (get)
				parametros opicionais - 'country' | 'page' | 'quantity_in_page'
				ex: 
				 <domain>/universities?country=Brazil
				 <domain>/universities?country=Brazil&page=2
				 <domain>/universities?country=Brazil&page=2&quantity_in_page
				 <domain>/universities?country=Brazil&quantity_in_page=30
				 <domain>/universities?quantity_in_page=30

			getById (get)
				ex:
					<domain>/universities/:id
			
			newUniversity (post)
				ex:
					<domain>/universities
						data: {
								"web_pages": ["web_page test"],
								"state-province": "Sao Paulo",
								"alpha_two_code": "SP",
								"name": "Anhanguera",
								"country": "Brasil",
								"domains": ["usp.com.br"]
						}

			updateUniversity (put)
				ex:
					<domain>/universities/:id
						data: {
								"web_pages": ["web_page test"],
								"state-province": "Sao Paulo",
								"alpha_two_code": "SP",
								"name": "Anhanguera",
								"country": "Brasil",
								"domains": ["usp.com.br"]
						}
			
				delete (delete)
				ex:
					<domain>/universities/:id
