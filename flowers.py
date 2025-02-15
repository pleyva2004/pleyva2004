import turtle
import random

def draw_arc_leaf(t, radius, extent, color):
    """
    Draw a single filled arc leaf using the given radius and extent.
    """
    t.color(color)
    t.begin_fill()
    t.circle(radius, extent)
    # Close the arc by drawing a straight line back to the start
    # We manually compute an approximate chord
    # so we can fill the shape and give it a "leaf" look
    position = t.position()
    heading = t.heading()
    # Turn back to the starting point
    t.setheading(t.heading() + 180 - extent)
    # Move in a straight line to the arc's beginning
    t.circle(radius, extent, steps=1)  
    t.setheading(heading)
    t.setposition(position)
    t.end_fill()

def draw_leaf_cluster(t, x, y, color="cyan", scale=1.0):
    """
    Draw a bottom cluster of layered arcs (leaves) at (x, y).
    This is just an approximate stylized leaf cluster.
    """
    t.penup()
    t.goto(x, y)
    t.setheading(90)  # point upward
    t.pendown()

    # Draw multiple arcs layered behind each other
    # Adjust angles and sizes for different shapes
    num_leaves = 8
    arc_radius = 30 * scale
    extent = 180
    for i in range(num_leaves):
        draw_arc_leaf(t, arc_radius, extent, color)
        # Move a bit to the right and slightly up for the next layer
        t.penup()
        t.setheading(0)  
        t.forward(10 * scale)  
        t.setheading(90)
        t.forward(5 * scale)  
        t.pendown()
        arc_radius -= 2 * scale  # slightly decrease arc size each time

def draw_stem_and_flower(t, x, y, color="cyan", scale=1.0):
    """
    Draw a single stylized stem and flower at (x, y).
    """
    # Draw the stem
    t.penup()
    t.goto(x, y)
    t.setheading(90)  # straight up
    t.pendown()
    t.color(color)
    t.pensize(2 * scale)
    
    stem_length = 100 * scale
    t.forward(stem_length)

    # Draw a simple open flower at the tip
    # We'll do a circle “center” plus some arcs for petals
    flower_center_radius = 6 * scale
    
    # Draw center of the flower
    t.begin_fill()
    t.color("yellow")
    t.circle(flower_center_radius)
    t.end_fill()

    # Move up slightly to draw petals
    t.penup()
    t.setheading(90)
    t.forward(5 * scale)
    t.pendown()

    # Draw petals (4 arcs around center)
    petal_color = color
    petal_radius = 15 * scale
    t.color(petal_color)
    for _ in range(4):
        t.begin_fill()
        t.circle(petal_radius, 60)  # arc for petal
        t.left(120)
        t.circle(petal_radius, 60)
        t.end_fill()
        t.left(180)  # rotate to position next petal

def draw_fireflies(t, num_fireflies=15, color="yellow"):
    """
    Randomly place small glowing dots ("fireflies") around the scene.
    """
    width = turtle.window_width() // 2
    height = turtle.window_height() // 2

    t.color(color)
    t.penup()
    for _ in range(num_fireflies):
        # random x, y within the screen range
        rand_x = random.randint(-width, width)
        rand_y = random.randint(-height, height)
        size = random.uniform(2, 5)  # random radius for the glow

        t.goto(rand_x, rand_y)
        t.begin_fill()
        t.circle(size)
        t.end_fill()
    t.pendown()

def main():
    screen = turtle.Screen()
    screen.bgcolor("black")  # dark background for glowing effect
    screen.title("Glowing Stylized Flowers")

    t = turtle.Turtle()
    t.speed("fastest")
    t.hideturtle()

    # Draw the big leaf cluster at the bottom
    draw_leaf_cluster(t, x=0, y=-200, color="#00CED1", scale=1.2)

    # Draw three stems & flowers rising from it
    # Adjust x-positions slightly so they aren't all on top of each other
    stem_positions = [-40, 0, 40]
    for x_pos in stem_positions:
        draw_stem_and_flower(t, x_pos, -160, color="#00FFFF", scale=1.0)

    # Add some random "fireflies" around
    draw_fireflies(t, num_fireflies=20, color="yellow")

    # Keep window open until clicked
    screen.exitonclick()

if __name__ == "__main__":
    main()
