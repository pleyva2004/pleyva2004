import numpy as np
import matplotlib.pyplot as plt

# Create an array of t values from 0 to 2*pi
t = np.linspace(0, 2 * np.pi, 1000)

# Define x and y based on the parametric equations
x = 16 * (np.sin(t) ** 3)
y = 13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3 * t) - np.cos(4 * t)

# Plot
plt.figure(figsize=(6, 6))
plt.fill(x, y, color='red', alpha=1.0)
plt.title("Feliz Dia del Amor y la Amistad")
plt.axis('equal')  # Ensure the aspect ratio is equal so the shape isn't distorted
plt.axis('off')
plt.grid(True)
plt.show()
