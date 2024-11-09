import './App.css'
import './styles.css'

import Ingredients from './ingredients'
import Macros from './macros'

function App() {
    return (
        <>
            <h1>ChefItUp</h1>
            <p>All we you need to do is let us know what ingredients you have, and we'll let tou know the best recipes you can make based on your macro perferences.</p>
            <div class="container">
                <Ingredients/>
                <Macros/>
                <Macros/>
            </div>
        </>
    )
}

export default App
