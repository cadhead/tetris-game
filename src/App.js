import GameComponent from './components/Game';

async function App() {
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="container">
      ${GameComponent()}
    </div>
  `;
  return template.content.cloneNode(true);
}

export default App;
