from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker,declarative_base
from sqlalchemy.types import Float,Date
# Cria a conexão com o banco de dados
engine = create_engine('sqlite:///bd_coletas.db')
Base = declarative_base()

# Define a classe para a tabela
class Coletas(Base):
    __tablename__ = 'coletas'
    id = Column(Integer, primary_key=True)
    id_coleta = Column(Integer)
    cep = Column(String)
    logradouro = Column(String)
    cidade = Column(String)
    uf = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    data_coleta= Column(Date)
    remetente = Column(String)

# Cria a tabela no banco de dados
Base.metadata.create_all(engine)

def salva_coleta(dados):
    # Cria uma sessão para interagir com o banco de dados
    Session = sessionmaker(bind=engine)
    session = Session()

    coleta = Coletas(id_coleta=dados['coleta'],
                    cep=dados['cep'],logradouro=dados['logradouro'],
                    cidade=dados['cidade'],uf=dados['uf'],lat=dados['lat'],
                    lng=dados['lng'],remetente=dados['remetente']) 
    session.add(coleta)
    session.commit()

    # Exemplo de consulta de dados
    coletas = session.query(Coletas).all()
    for coleta in coletas:
        print(coleta.id, coleta.id_coleta)

    