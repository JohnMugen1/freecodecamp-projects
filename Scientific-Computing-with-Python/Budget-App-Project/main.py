class Category:
    def __init__(self, category):
        # Initializes a category with a name and an empty ledger
        self.category = category
        self.ledger = []

    @property
    def balance(self):
        # Computes the current balance dynamically from the ledger
        return sum(entry['amount'] for entry in self.ledger)

    def __str__(self):
        # Creates a formatted string representation of the category
        title = f"{self.category:*^30}\n"  # Centers the category name with '*' padding
        items = ""

        for record in self.ledger:
            # Formats description (max 23 characters) and amount (right-aligned)
            description = f"{record['description'][:23]:<23}"
            amount = f"{record['amount']:>7.2f}"
            items += f"{description}{amount}\n"

        total = f"Total: {self.balance:.2f}"  # Displays total balance
        return title + items + total

    def deposit(self, amount, description=""):
        # Adds a deposit entry to the ledger
        self.ledger.append({'amount': amount, 'description': description})

    def withdraw(self, amount, description=""):
        # Withdraws amount if sufficient funds are available
        if self.check_funds(amount):
            self.ledger.append({'amount': -amount, 'description': description})
            return True
        return False

    def get_balance(self):
        # Returns the current balance
        return self.balance

    def transfer(self, amount, category):
        # Transfers funds to another category if sufficient funds are available
        if self.withdraw(amount, f"Transfer to {category.category}"):
            category.deposit(amount, f"Transfer from {self.category}")
            return True
        return False

    def check_funds(self, amount):
        # Checks if there are enough funds for a transaction
        return amount <= self.balance

    def total_withdrawal(self):
        # Calculates the total withdrawals (spendings)
        return sum(-entry['amount'] for entry in self.ledger if entry['amount'] < 0)


def create_spend_chart(categories):
    chart = "Percentage spent by category\n"  # Title of the chart

    # Calculate total spending across all categories
    total_spent = sum(category.total_withdrawal() for category in categories)

    # Compute spending percentage for each category
    category_spent_percentages = [
        (category.total_withdrawal() / total_spent) * 100 if total_spent > 0 else 0
        for category in categories
    ]

    # Round percentages down to the nearest 10
    rounded_percentages = [int(percent // 10) * 10 for percent in category_spent_percentages]

    # Generate percentage scale (from 100% to 0%)
    for i in range(100, -1, -10):
        chart += f"{i:>3}| "  # Right-align percentage values
        chart += "".join("o  " if percent >= i else "   " for percent in rounded_percentages)
        chart += "\n"

    # Draw horizontal baseline below the bars
    chart += "    " + "-" * (3 * len(categories) + 1) + "\n"

    # Extract category names and align them for vertical display
    category_names = [category.category for category in categories]
    max_length = max(len(name) for name in category_names)  # Find the longest name
    category_names_padded = [name.ljust(max_length) for name in category_names]  # Pad names to same length

    # Align category names vertically below the bars
    for i in range(max_length):
        chart += "     "  # Indent for alignment
        chart += "  ".join(name[i] for name in category_names_padded)  # Pick the i-th character from each name
        chart += "  \n"  # Maintain consistent spacing

    return chart.rstrip("\n")  # Ensure no extra newline at the end


# Example usage
food = Category("Food")
food.deposit(1000, "Deposit")
food.withdraw(10.15, "Groceries")
food.withdraw(15.89, "Restaurant and more food for dessert")

clothing = Category("Clothing")
food.transfer(50, clothing)

entertainment = Category("Entertainment")

categories = [food, clothing, entertainment]
print(create_spend_chart(categories))
