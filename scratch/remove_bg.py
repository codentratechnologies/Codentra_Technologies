from PIL import Image
import os

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Check if the pixel is close to white
        # We can adjust the threshold if needed
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0)) # Fully transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    input_file = "public/favicon.png"
    output_file = "public/favicon.png"
    if os.path.exists(input_file):
        remove_background(input_file, output_file)
        print("Background removed successfully.")
    else:
        print(f"Error: {input_file} not found.")
