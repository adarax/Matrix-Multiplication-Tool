export const clearDimensions = () =>
{
    let selects = document.querySelectorAll('select');

    for (let i = 0; i < selects.length; i++)
    {
        selects[i].value = 1;
    }
}

export const clear = () =>
{
    document.querySelector('.setup').style.display = 'block';
    document.querySelector('.matrix-input').style.display = 'none';
    document.querySelector('.result').style.display = 'none';

    // Clear all matrices
    let matrices = document.querySelectorAll('.matrix');
    for (let i = 0; i < matrices.length; i++)
    {
        matrices[i].remove();
    }

    // Clear all inputs
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++)
    {
        inputs[i].value = '';
    }

    // Clear all resultants
    let resultants = document.querySelectorAll('.resultant');
    for (let i = 0; i < resultants.length; i++)
    {
        resultants[i].remove();
    }
}

export const createMatrices = () =>
{
    if (document.getElementById('no-columns-1').value !== document.getElementById('no-rows-2').value)
    {
        alert('Invalid dimensions!\n\nThe number of columns of the first matrix must be equal to the number of rows of the second matrix');
    }
    else
    {
        document.querySelector('.setup').style.display = 'none';
        document.querySelector('.matrix-input').style.display = 'block';

        let m1Dimensions = [document.getElementById('no-rows-1').value, document.getElementById('no-columns-1').value];
        let m2Dimensions = [document.getElementById('no-rows-2').value, document.getElementById('no-columns-2').value];

        setup(m1Dimensions, m2Dimensions);
    }
}

const setup = (m1, m2) =>
{
    // clear matrices (if any exist)
    document.querySelector('.matrices').innerHTML = '';

    // create matrices
    let matrices = document.querySelector('.matrices');

    let matrix1 = document.createElement('div');
    matrix1.id = 'matrix1';
    matrix1.classList.add('matrix1');

    let matrix2 = document.createElement('div');
    matrix2.id = 'matrix2';
    matrix2.classList.add('matrix2');

    let matrix1Title = document.createElement('h3');
    matrix1Title.innerHTML = 'Matrix 1';
    matrix1.appendChild(matrix1Title);

    let matrix2Title = document.createElement('h3');
    matrix2Title.innerHTML = 'Matrix 2';
    matrix2.appendChild(matrix2Title);

    for (let i = 0; i < m1[0]; i++)
    {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < m1[1]; j++)
        {
            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add('input');
            row.appendChild(input);
        }

        matrix1.appendChild(row);
    }

    for (let i = 0; i < m2[0]; i++)
    {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < m2[1]; j++)
        {
            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add('input');
            row.appendChild(input);
        }

        matrix2.appendChild(row);
    }

    matrices.appendChild(matrix1);
    matrices.appendChild(matrix2);
}

export const multiply = () =>
{
    let m1 = document.querySelector('.matrix1');
    let m2 = document.querySelector('.matrix2');

    let m1Rows = m1.querySelectorAll('.row');
    let m2Rows = m2.querySelectorAll('.row');

    let m1Array = [];
    let m2Array = [];

    for (let i = 0; i < m1Rows.length; i++)
    {
        let row = m1Rows[i].querySelectorAll('.input');
        let rowArray = [];

        for (let j = 0; j < row.length; j++)
        {
            rowArray.push(row[j].value);
        }

        m1Array.push(rowArray);
    }

    for (let i = 0; i < m2Rows.length; i++)
    {
        let row = m2Rows[i].querySelectorAll('.input');
        let rowArray = [];

        for (let j = 0; j < row.length; j++)
        {
            rowArray.push(row[j].value);
        }

        m2Array.push(rowArray);
    }

    let resultant = multiplyMatrices(m1Array, m2Array);
    displayResultant(resultant);
};

var invalidOperation;

const multiplyMatrices = (m1, m2) =>
{
    invalidOperation = false;
    let resRows = m1.length;
    let resCols = m2[0].length;
    let commonDimension = m1[0].length;
    let resultantDimensions = "Resultant is a " + resRows + " by " + resCols + " matrix:";

    document.getElementById("dimensions-of-resultant").innerHTML = resultantDimensions;

    // Set up the above dimensions in HTML (the matrix)
    let resultant = [];

    // each column of m1 with each row of m2
    for (let i = 0; i < resRows; ++i)
    {
        let row = [];

        for (let j = 0; j < resCols; ++j)
        {
            let vector1 = m1[i];

            // get column of m2
            let vector2 = [];
            for (let k = 0; k < commonDimension; ++k)
            {
                vector2.push(m2[k][j]);
            }

            let dot = dotProduct(vector1, vector2);
            row.push(dot);
        }

        resultant.push(row);

        if (invalidOperation)
        {
            break;
        }
    }

    if (invalidOperation)
    {
        alert("Invalid input");
    }
    else {
        // Hide input and show result   
        document.querySelector('.matrix-input').style.display = 'none';
        document.querySelector('.result').style.display = 'block';
    }

    return resultant;
}

const displayResultant = (resultant) =>
{
    let resultantMatrix = document.getElementById('resultant-matrix');

    // Clear any previous results
    if (resultantMatrix)
    {
        resultantMatrix.innerHTML = '';
    }

    for (let i = 0; i < resultant.length; i++)
    {
        let row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < resultant[i].length; j++)
        {
            let input = document.createElement('input');
            input.type = 'text';
            input.classList.add('input');
            input.value = resultant[i][j];
            row.appendChild(input);
        }

        resultantMatrix.appendChild(row);
    }

    // Append the new result
    let resultantDiv = document.querySelector('.resultant-matrix');
    resultantDiv.append(resultantMatrix);
}

const dotProduct = (vector1, vector2) =>
{
    let sum = 0;

    for (let i = 0; i < vector1.length; ++i)
    {
        sum = addFractions(sum, multiplyFractions(vector1[i], vector2[i]));
    }

    return reduceFraction(sum);
}

const isValidFractionOrNumber = a =>
{
    let isFraction = false;

    if (a.includes('/'))
    {
        isFraction = true;
    }

    if (isFraction)
    {
        let asParts = a.split('/');

        if (asParts.length !== 2)
        {
            return false;
        }

        if (isNaN(asParts[0]) || isNaN(asParts[1]))
        {
            return false;
        }

        // Check if denominator is 0
        if (asParts[1] === 0)
        {
            return false;
        }
    }
    else
    {
        if (isNaN(a))
        {
            return false;
        }
    }

    return true;
}

// Adds two fractions given in string form
// Returns a non reduced fraction, reduction is done later
const addFractions = (fraction1, fraction2) =>
{
    // Convert to string
    fraction1 = fraction1.toString();
    fraction2 = fraction2.toString();

    // Check for invalid input
    if (!isValidFractionOrNumber(fraction1) || !isValidFractionOrNumber(fraction2))
    {
        invalidOperation = true;
    }

    // If a or b is a number, convert to fraction
    if (!fraction1.includes('/'))
    {
        fraction1 += '/1';
    }

    if (!fraction2.includes('/'))
    {
        fraction2 += '/1';
    }

    let fraction1AsParts = fraction1.split('/');
    let fraction2AsParts = fraction2.split('/');

    // If a and b both have denominators of 1, add them and return
    if (fraction1AsParts[1] === 1 && fraction2AsParts[1] === 1)
    {
        return parseFloat(fraction1AsParts[0]) + parseFloat(fraction2AsParts[0]);
    }

    // If denominators are equal, add numerators and return
    if (fraction1AsParts[1] === fraction2AsParts[1])
    {
        return (parseFloat(fraction1AsParts[0]) + parseFloat(fraction2AsParts[0])) + '/' + fraction1AsParts[1];
    }

    // If denominators are not equal, multiply numerators by denominators and add
    let numerator = (parseFloat(fraction1AsParts[0]) * parseFloat(fraction2AsParts[1])) + (parseFloat(fraction2AsParts[0]) * parseFloat(fraction1AsParts[1]));
    let denominator = parseFloat(fraction1AsParts[1]) * parseFloat(fraction2AsParts[1]);

    return numerator + '/' + denominator;
}

const multiplyFractions = (a, b) =>
{
    let aIsFraction = a.includes('/');
    let bIsFraction = b.includes('/');

    // Check for invalid input
    if (!isValidFractionOrNumber(a) || !isValidFractionOrNumber(b))
    {
        invalidOperation = true;
    }

    if (aIsFraction && bIsFraction)
    {
        let aParts = a.split('/');
        let bParts = b.split('/');

        let numerator = (aParts[0] * bParts[0]);
        let denominator = (aParts[1] * bParts[1]);

        return numerator + '/' + denominator;
    } else if (aIsFraction)
    {
        let aParts = a.split('/');

        let numerator = (aParts[0] * b);
        let denominator = aParts[1];

        return numerator + '/' + denominator;
    } else if (bIsFraction)
    {
        let bParts = b.split('/');

        let numerator = (bParts[0] * a);
        let denominator = bParts[1];

        return numerator + '/' + denominator;
    } else
    {
        return a * b;
    }
}

// Returns a reduced fraction if the result is a fraction, otherwise returns an integer
const reduceFraction = value =>
{
    if (!value.toString().includes('/'))
    {
        return value;
    }

    let valueAsParts = value.split('/');
    let numerator = parseFloat(valueAsParts[0]);
    let denominator = parseFloat(valueAsParts[1]);

    let gcd = getGCD(numerator, denominator);

    let reducedNum = numerator / gcd;
    let reducedDen = denominator / gcd;

    if (reducedDen === 1 || numerator === 0)
    {
        return reducedNum;
    } else
    {
        return reducedNum + '/' + reducedDen;
    }
}

const getGCD = (a, b) =>
{
    if (a !== parseInt(a) || b !== parseInt(b))
    {
        return 1;
    }

    let factorsOfA = getFactors(a);
    let factorsOfB = getFactors(b);

    let commonFactors = [];

    for (let i = 0; i < factorsOfA.length; i++)
    {
        if (factorsOfB.includes(factorsOfA[i]))
        {
            commonFactors.push(factorsOfA[i]);
        }
    }

    return Math.max(...commonFactors);
}

const getFactors = (num) =>
{
    let factors = [];

    for (let i = 1; i <= num; i++)
    {
        if (num % i === 0)
        {
            factors.push(i);
        }
    }

    return factors;
}

