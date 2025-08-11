def arithmetic_arranger(problems, show_answers=False):
    # Check if there are too many problems
    if len(problems) > 5:
        return "Error: Too many problems."

    first_line = []
    second_line = []
    dashes = []
    final_results = []

    for problem in problems:
        num1, operator, num2 = problem.split()

        # Validate that both operands contain only digits
        if not num1.isdigit() or not num2.isdigit():
            return "Error: Numbers must only contain digits."

        # Validate the operand length
        if len(num1) > 4 or len(num2) > 4:
            return "Error: Numbers cannot be more than four digits."

        # Validate the operator
        if operator not in ["+", "-"]:
            return "Error: Operator must be '+' or '-'."

        # Determine the width of the problem
        width = max(len(num1), len(num2)) + 2

        # Perform the calculation if required
        if show_answers:
            result = str(eval(f"{num1} {operator} {num2}"))
            final_results.append(result.rjust(width))

        # Format the problem
        first_line.append(num1.rjust(width))
        second_line.append(operator + " " + num2.rjust(width - 2))
        dashes.append("-" * width)

    # Create the formatted output
    arranged_problems = "\n".join([
        "    ".join(first_line),
        "    ".join(second_line),
        "    ".join(dashes)
    ])
    
    # Append results if show_answers is True
    if show_answers:
        arranged_problems += "\n" + "    ".join(final_results)

    return arranged_problems


result = arithmetic_arranger(["32 - 698", "1 - 3801", "45 + 43", "123 + 49", "988 + 40"], True)

print(result)
