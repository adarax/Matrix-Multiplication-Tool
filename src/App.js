import './App.css';
import {clear, clearDimensions, createMatrices, multiply} from './logic.js';
import React, { useEffect } from 'react';

function App()
{
  useEffect(() =>
  {
    methodAfterDOMLoaded();
  }, []);

  const methodAfterDOMLoaded = () =>
  {
    clear();
  }

  return (
    /** TODO: 
     * Fix componentDidMount to call clear when the page loads
     * Make into a desktop app with Electron package manager
     */
    <div>
      <h1>Matrix Multiplier</h1>

      <div id="mainApp">
        <div className="setup">

          <p>Enter the dimensions of the matrices you want to multiply</p>

          <div id="matrix1">
            <div id="rows-select-1">
              <label>Select number of rows for first matrix</label>
              <select id="no-rows-1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div id="columns-select-1">
              <label>Select number of columns for first matrix</label>
              <select id="no-columns-1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          <div id="matrix2">
            <div id="rows-select-2">
              <label>Select number of rows for second matrix</label>
              <select id="no-rows-2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div id="columns-select-2">
              <label>Select number of columns for second matrix</label>
              <select id="no-columns-2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          <button id="reset-dimensions" onClick={clearDimensions}>Reset dimensions</button>
          <button id="btn-create-matrices" onClick={createMatrices}>Create matrices</button>
        </div>

        <div className="matrix-input">
          <p>Don't forget that order matters! Matrix multiplication is not commutative.</p>
          <div className="matrices"></div>
          <button id="back-to-setup" onClick={clear}>Back</button>
          <button id="btnMultiply" onClick={multiply}>Multiply</button>
        </div>

        <div className="result">
          <div className="resultant-matrix">
            <p id="dimensions-of-resultant"></p>
            <div id="resultant-matrix"></div>
          </div>
          <button id="clear" onClick={clear}>Restart</button>
        </div>
      </div>

      <footer>
        <p id="footer">Created by <a href="https://github.com/adarax" target="_blank"
          rel="noopener noreferrer">Adarax</a></p>
      </footer>
    </div>
  )
}

export default App;
