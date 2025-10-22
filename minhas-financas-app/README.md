# Minhas Finanças (Frontend)

Este projeto implementa o **frontend do sistema de controle financeiro**, uma interface de usuário moderna construída como uma *Single Page Application* (SPA).
Foi desenvolvido em **React**, utilizando Hooks, Context API e consumindo o backend RESTful do projeto Minhas Finanças.

-----

## Tecnologias Utilizadas

- **React - `v19.2.0`** (com Hooks, `useState`, `useEffect`)
- **React Router** (para roteamento de páginas)
- **Axios - `v1.12.2`** (para realizar chamadas à API REST)
- **PrimeReact** (para componentes de UI como `Dialog` e `Button`)
- **PrimeIcons** (para iconografia)
- **Toastr - `v2.1.4`** (para notificações e alertas)
- **Bootswatch (Flatly)** (como tema base CSS/Bootstrap)
- **`currency-formatter`** (para formatação de valores monetários)

-----

## Estrutura do Projeto

```
src/
├── app/
│   ├── services/
│   │   ├── apiService.js
│   │   ├── authService.js
│   │   ├── lancamentoService.js
│   │   ├── localStorageService.js
│   │   ├── provedorAutenticacao.js
│   │   └── usuarioService.js
│   └── exception/
│       └── ErroValidacao.js
│
├── components/
│   │   ├── card.jsx
│   │   ├── form-group.jsx
│   │   ├── navbar.jsx
│   │   ├── rotaAutenticada.jsx
│   │   ├── selectMenu.jsx
│   └── |── toastr.jsx
│
├── views/
│   │   ├── home.jsx
│   │   ├── login.jsx
│   │   ├── cadastroUsuario.jsx
│   │   └── lancamentos/
│   │       ├── cadastroLancamentos.jsx
│   │       ├── consultaLancamentos.jsx
│   │       └── lancamentosTable.jsx
│
├── main/
│   ├── App.jsx
│   └── rotas.jsx
│
├── index.jsx
└── custom.css
```

-----

## Descrição dos Componentes/Camadas

## **`index.jsx`**
- `index.jsx`: Ponto de entrada da aplicação. Renderiza o componente `App` no elemento `root` do DOM.

### **`main/` (Configuração Central)**

Camada responsável pela inicialização e estrutura global da aplicação.
- `App.jsx`: Componente principal que envolve toda a aplicação. É responsável por incluir os provedores globais (`AuthProvider`, `BrowserRouter`), a `Navbar` e importar todos os arquivos CSS globais (Bootstrap, Toastr, PrimeReact).
- `rotas.jsx`: Define o mapeamento de todas as rotas (URLs) da aplicação para os seus respectivos componentes (Views), utilizando o `react-router`.

### **`views/` (Páginas/Telas)**

Componentes React que representam uma tela completa do sistema, como `Login`, `Home` ou `ConsultaLancamentos`.
Responsabilidades principais:

- Orquestrar a exibição dos componentes de UI.
- Gerenciar o estado da página (ex: dados de formulários, resultados de busca).
- Invocar os serviços (`app/services/`) para buscar ou enviar dados.

### **`components/` (Componentes Reutilizáveis)**

Componentes de UI genéricos, projetados para serem reutilizados em múltiplas `views`.

- Exemplos: `Card`, `FormGroup`, `SelectMenu`.
- `navbar.jsx`: A barra de navegação superior, que exibe links diferentes dependendo se o usuário está autenticado (usando o `useAuth` hook).
- `rotaAutenticada.jsx`: Um "Guarda de Rota". Verifica se o usuário está autenticado (`AuthService.isUsuarioAutenticado`). Se não estiver, redireciona o usuário para a tela de `/login`.

### **`app/services/` (Serviços e Lógica de Negócio)**

Classes e módulos que centralizam a lógica de negócio e a comunicação com a API.

- `apiService.jsx`: Classe base que configura uma instância do `axios`. Define a `baseURL` da API (`http://localhost:8081`) e os métodos HTTP padrão (POST, PUT, DELETE, GET).
- `usuarioService.jsx` / `lancamentoService.jsx`: Estendem o `ApiService` e implementam as regras de negócio específicas para suas entidades (ex: `autenticar`, `consultar`, `cadastrarLancamento`). Também contêm a lógica de validação dos dados de entrada.
- `provedorAutenticacao.jsx`: Implementa um Provedor React (usando `AuthContext`) para gerenciar o estado de autenticação (`isAutenticado`) e as funções (`login`, `logout`) de forma global na aplicação.
- `authService.jsx`: Serviço auxiliar que interage com o `localStorageService` para verificar se um usuário está autenticado, logar (salvar no storage) ou deslogar (remover do storage).
- `localStorageService.jsx`: Uma classe estática utilitária que encapsula a interação com o `localStorage` do navegador, tratando a serialização (`JSON.stringify`) e desserialização (`JSON.parse`) dos dados.

### **`app/exception/` (Exceções Customizadas)**

- `ErroValidacao.jsx`: Uma classe de exceção customizada usada pelos serviços (ex: `lancamentoService.validar`) para agrupar mensagens de erro de validação de formulário.

### **`components/toaster/` (Notificações)**

- `toastr.jsx`: Funções que consomem a biblioteca toastr para gerar notificações dinâmicas (erro, aviso ou sucesso) baseadas nas ações do usuário.

-----

## Conexão com o Backend

Este projeto frontend foi desenvolvido para consumir a API do **Minhas Finanças Backend**.

- O `apiService.jsx` está configurado para fazer requisições para a URL base: `http://localhost:8081`.
- Esta porta deve ser a mesma em que o backend Spring Boot está sendo executado, conforme definido no `application.properties` do backend (`server.port=8081`).

-----

## Build e Execução

### Requisitos

- Node.js (**`v16+`**) e Yarn (**`1.22.22+`**) instalados.
- O projeto **Minhas Finanças (Backend)** deve estar em execução no endereço `http://localhost:8081`.

### Executar a aplicação

1.  **Instalar dependências:**

    ```bash
    yarn install
    ```

2.  **Iniciar o servidor de desenvolvimento:**

    ```bash
    yarn start
    ```

A aplicação frontend ficará disponível em:
`http://localhost:3000` (Porta padrão do Create React App)