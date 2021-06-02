import "antd/dist/antd.css";
//importando o css and design 
import {Table, Button, message, Layout, Menu} from 'antd';
//essas são as importações que vou usar na página, sendo importadas diretamente do ant design -> tem na documentação deles
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import InvestimentoService from "../../service/InvestimentoService";
const {Header, Content, Footer} = Layout;
//nao entendi
const {Column} = Table;
//nao entendi

//exportando o componente todo (a pagina), pra que ela possa ser usada em todo projeto
export default function ListarInvestimentos() {
    const [Investimentos, setInvestimentos] = useState([]);

    useEffect(()=> {
        refreshInvestimentos();
    }, [])

    async function refreshInvestimentos() {
        InvestimentoService.retrieveAllInvestimentos()
            .then(
                response => {
                    setInvestimentos(response.data)
                }
            )
    }


    function remove(record) {
        console.log(record)
        InvestimentoService.deleteInvestimento(record.codigo)
        message.success('Investimento removido com sucesso!');
    };

    //tudo que eu quero que seja construido tem que esta no retorno
    return (
        <div className="container">
            <Layout className="Layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/cadastrar-investimentos">
                                Cadastrar Investimento
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/listar-investimentos">
                                Listar Investimentos
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div className="site-layout-content">
                        <h2>INVESTIMENTOS</h2>
                        <Table dataSource={Investimentos}>
                            <Column title="Código do ativo" dataIndex="codigoAtivo"  key="codigoAtivo" />
                            <Column title="Valor" dataIndex="valorCota"  key="valorCota" />
                            <Column title="Quantidade de Cotas" dataIndex="quantidadeCotas"  key="quantidadeCotas" />
                            <Column title="Data de Compra" dataIndex="dataCompra"  key="dataCompra" />
                            <Column title="Código do ativo" dataIndex="codigoAtivo"  key="codigoAtivo" />
                            <Column title="Remover" key="Remover" 
                                render={(text, record) => (<Button onClick={() => remove(record)} type="primary">Remover</Button>)}
                            />
                        </Table>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    My Invest @2021
                </Footer>
            </Layout>
        </div>
    );
}