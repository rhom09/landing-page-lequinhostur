import os
import re
import glob
import time
from deep_translator import GoogleTranslator

# Target directory
skills_dir = r"C:\Users\Usuario\.gemini\antigravity\skills"

# Find all gsd-* directories
gsd_dirs = glob.glob(os.path.join(skills_dir, "gsd-*"))

translator = GoogleTranslator(source='en', target='pt')

def translate_description(file_path):
    if not os.path.exists(file_path):
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find the description field in the YAML header
    match = re.search(r'^(description:\s*)([\'"]?)(.*?)([\'"]?)$', content, flags=re.MULTILINE)
    
    if match:
        prefix = match.group(1)
        quote_start = match.group(2)
        text_to_translate = match.group(3)
        quote_end = match.group(4)
        
        # Don't translate if it seems already translated or empty
        if not text_to_translate.strip() or "Gerar testes" in text_to_translate or "Criar" in text_to_translate or "Tradução" in text_to_translate:
            # Basic heuristic to avoid double translation
            return
            
        print(f"Translating {os.path.basename(os.path.dirname(file_path))}")
        try:
            translated_text = translator.translate(text_to_translate)
            
            # Ensure we maintain quotes if they were there, or add them if the translated text has colons etc.
            if not quote_start and not quote_end:
                quote_start = '"'
                quote_end = '"'
                
            new_line = f"{prefix}{quote_start}{translated_text}{quote_end}"
            
            # Replace in content
            new_content = content[:match.start()] + new_line + content[match.end():]
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            print(f"  -> Translated successfully")
            # small delay to prevent rate limits
            time.sleep(0.2)
        except Exception as e:
            print(f"Error translating {file_path}: {e}")

print(f"Found {len(gsd_dirs)} GSD skills.")
for d in gsd_dirs:
    skill_file = os.path.join(d, "SKILL.md")
    translate_description(skill_file)

print("Translation completed.")
