import os
from PIL import Image

def optimize_images(directory):
    for filename in os.listdir(directory):
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(directory, filename)
            img = Image.open(filepath)
            
            # Target path with .webp extension
            name_without_ext = os.path.splitext(filename)[0]
            webp_path = os.path.join(directory, f"{name_without_ext}.webp")
            
            print(f"Otimizando {filename}...")
            
            # Convert to WebP
            img.save(webp_path, 'WEBP', quality=80)
            
            # Special case for logo-mobile.png which is very large
            if filename == 'logo-mobile.png':
                # Resize if necessary (e.g., if it's 2000px+, but for a mobile logo 400-600px is enough)
                if img.width > 600:
                    img.thumbnail((600, 600))
                    img.save(webp_path, 'WEBP', quality=80)
                    print(f"Redimensionado e convertido: logo-mobile.webp")
            
            # Special case for favicon.png
            if filename == 'favicon.png':
                img.thumbnail((32, 32))
                img.save(os.path.join(directory, 'favicon-32.png'), 'PNG', optimize=True)
                print(f"Favicon otimizado gerado.")

if __name__ == "__main__":
    public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public'))
    optimize_images(public_dir)
    print("Otimização concluída!")
