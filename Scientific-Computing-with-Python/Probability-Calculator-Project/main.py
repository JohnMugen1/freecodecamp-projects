import random
from collections import Counter

class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for color, count in kwargs.items():
            self.contents.extend([color] * count)
    
    def draw(self, num_balls_to_draw):
        if num_balls_to_draw >= len(self.contents):
            drawn = self.contents.copy()
            self.contents = []
            return drawn
        shuffled = random.sample(self.contents, len(self.contents))
        drawn = shuffled[:num_balls_to_draw]
        self.contents = shuffled[num_balls_to_draw:]
        return drawn

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    original_color_counts = {}
    for ball in hat.contents:
        original_color_counts[ball] = original_color_counts.get(ball, 0) + 1
    
    num_success = 0
    for _ in range(num_experiments):
        new_hat = Hat(**original_color_counts)
        drawn_balls = new_hat.draw(num_balls_drawn)
        drawn_counter = Counter(drawn_balls)
        success = True
        for color, count in expected_balls.items():
            if drawn_counter.get(color, 0) < count:
                success = False
                break
        if success:
            num_success += 1
    return num_success / num_experiments