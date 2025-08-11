class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height})"

    def set_width(self, new_width):
        self.width = new_width

    def set_height(self, new_height):
        self.height = new_height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * (self.width + self.height)

    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** 0.5

    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return "Too big for picture."
        return "\n".join(["*" * self.width for _ in range(self.height)]) + "\n"  # Ensure newline at the end

    def get_amount_inside(self, other_shape):
        return self.get_area() // other_shape.get_area()


class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)

    def __str__(self):
        return f"Square(side={self.width})"

    def set_side(self, new_side):
        self.width = self.height = new_side

    def set_width(self, new_width):
        self.set_side(new_width)

    def set_height(self, new_height):
        self.set_side(new_height)

    def get_picture(self):
        if self.width > 50:
            return "Too big for picture." 
        return "\n".join(["*" * self.width for _ in range(self.height)]) + "\n"  # Ensure newline at the end

# Testing
rect = Rectangle(5, 3)
sq = Square(4)

print("Rectangle Picture:")
print(rect.get_picture())

print("Square Picture:")
print(sq.get_picture())
