import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CadastrarInvestimentos from '../pages/CadastrarInvestimentos';
import ListarInvestimentos from '../pages/ListarInvestimentos';

export default function Routes() {
    return(
        <BrowserRouter>
        {/* BrowserRouter vai funcionar como um main do browser e o switch será responsável pela troca 
            de componentes a depender da rota selecionada
         */}
            <Switch>
                <Route exact path="/" component={ListarInvestimentos}></Route>
                <Route exact path="/listar-investimentos" component={ListarInvestimentos}></Route>
                <Route exact path="/cadastrar-investimentos" component={CadastrarInvestimentos}></Route>
            </Switch>
        </BrowserRouter>
    );
}