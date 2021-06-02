import "antd/dist/antd.css";
import {Form, Button, message, DatePicker, Layout, Menu, Input, InputNumber, Select} from 'antd';
import {Link} from 'react-router-dom';
//essas são as importações que vou usar na página, sendo importadas diretamente do ant design -> tem na documentação deles
import InvestimentoService from "../../service/InvestimentoService"
import {useState, useEffect} from "react";
import CategoriaService from "../../service/CategoriaService";
//importando o css and design 
const {Header, Content, Footer} = Layout;
const {Option} = Select;
//nao entendi
//exportando o componente todo (a pagina), pra que ela possa ser usada em todo projeto
export default function CadastrarInvestimentos(){

    const [categorias, setCategoria] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)
    function refreshCategorias() {
        CategoriaService.retrieveAllCategorias()
        .then(
            response => {
                setCategoria(response.data)
            }
        )
    }

    useEffect(()=> {
        refreshCategorias();
    }, [])

    const layout = {
        labelCol: { 
            span: 4 
        },
        wrapperCol: { 
            span: 3 
        },
    };
    const tailLayout = {
        wrapperCol: { offset: 4},
    };
    const onFinish = (values) =>{
        console.log(values)
        InvestimentoService.saveInvestimento(values)
        message.success("Investimento salvo com sucesso")
    }
    const onFinishFailed  = (erroInfo) =>{
        message.danger("Houve um erro ao salvar o investimento")
        console.log('Failed: ', erroInfo)
    }
    function handleChange(value) {
        setCategoriaSelecionada(value);
    }

    //tudo que eu quero que seja construido tem que esta no retorno
    return (
        <div className="container">
            <Layout className="layout">
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
                        <h2>CADASTRAR INVESTIMENTO</h2>
                      <Form {...layout} name="basic" initialValues={{remember: true,}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                            <Form.Item label="Código do ativo" name="codigoAtivo"
                                       rules={[{
                                           required: true,
                                           message: 'Insira o código do ativo !',
                                       }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Valor" name="valorCota"
                                       rules={[{
                                           required: false,
                                           message: 'Insira o valor da cota !',
                                       }]}>
                                <InputNumber/>
                            </Form.Item>
                            <Form.Item label="Quantidade de cotas" name="quantidadeCotas"
                                       rules={[{
                                           required: true,
                                           message: 'Insira a quantidade de Cotas !',
                                       }]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="Data da compra" name="dataCompra"
                                       rules={[{
                                           required: true,
                                           message: 'Insira a data da compra !',
                                       }]}>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item label="Categoria" name="categoria"
                                       rules={[{
                                           required: false,
                                           message: 'Insira a categoria !',
                                       }]}>
                                <Select onChange={handleChange}>
                                    {categorias.map((item, index) => {
                                        return(
                                            <Option key={item.codigo} value={index}>
                                                {item.nome}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Salvar
                                </Button>
                            </Form.Item>
                       </Form>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    My Invest @2021
                </Footer>
            </Layout>
        </div>
    );
}