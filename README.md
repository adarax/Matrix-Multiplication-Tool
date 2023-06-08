# A Simple Matrix Multiplication Desktop Application

## Steps to run the application:
### **As native application (Windows, Mac, Linux):**
1. Ensure that Node.js is installed on your machine as well as npm.
2. Clone the repository.
3. Navigate to the root directory of the repository.
4. Install the necessary dependencies.
    ```
    npm install --save-dev electron-packager
    ```
5. Package the files. 
    ```
    npx electron-packager . "Matrix Multiplier" --platform=<platform> --arch=<arch>
    ```
6. Start the application (you can close the browser tab that is automatically opened).
    ```
    npm start
    ```
7. Navigate to the newly created directory and double click on the executable file to run the application.

### **As a web application:**
1. Ensure that Node.js is installed on your machine as well as npm.
2. Clone the repository.
3. Navigate to the root directory of the repository.
4. Run the application.
    ```
    npm start
    ```
