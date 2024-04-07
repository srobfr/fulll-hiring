
/**
 * A javascript FizzBuzz implementation.
 *
 * @see https://github.com/fulll/hiring/blob/master/Algo/fizzbuzz.md
 * @param {Array<{divisor: number, text: string}>} rules
 * @param {number} n The maximum number to process
 * @param {(text: string|number) => void} output The output function to use, typically console.log
 */
function fizzBuzz(rules, n, output = console.log) {
    for (let i = 1; i <= n; i++) {
        const rulesEvaluationResult = rules
            .map(({ divisor, text }) => (i % divisor === 0 ? text : ""))
            .join("");

        output(rulesEvaluationResult || i);
    }
}

fizzBuzz(
    [
        { divisor: 3, text: "Fizz" },
        { divisor: 5, text: "Buzz" },
    ],
    15
);

