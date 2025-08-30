# app.py
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Route to serve the main HTML pages
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/academy.html')
def academy():
    return render_template('academy.html')

@app.route('/tournament.html')
def tournament():
    return render_template('tournament.html')

@app.route('/gallery.html')
def gallery():
    return render_template('gallery.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/kpl-nepal-tournament.html')
def kpl_nepal():
    return render_template('kpl-nepal-tournament.html')
    
@app.route('/privacy.html')
def privacy():
    return render_template('privacy.html')
    
@app.route('/terms.html')
def terms():
    return render_template('terms.html')
    
@app.route('/academy-nagpur.html')
def academy_nagpur():
    return render_template('academy-nagpur.html')

# This special route serves all other files (like CSS, JS, and images)
@app.route('/<path:path>')
def serve_static(path):
    return app.send_static_file(path)


# The rest of your form submission handlers remain the same
@app.route('/contact', methods=['POST'])
def handle_contact_form():
    """Handles the contact form submission from contact.html."""
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # In a real-world scenario, you would save this to a database or send an email.
        print(f"New Contact Message from {name}:")
        print(f"Email: {email}")
        print(f"Message: {message}\n")
        
        return jsonify(success=True, message="Message sent successfully!"), 200
    except Exception as e:
        print(f"Error handling contact form: {e}")
        return jsonify(success=False, message="An error occurred."), 500

@app.route('/register-academy', methods=['POST'])
def handle_academy_registration():
    """Handles the academy registration form from academy.html."""
    try:
        data = request.json
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')
        academy = data.get('academy')
        question = data.get('question')

        # In a real-world scenario, this data would be saved for a coach to review.
        print(f"New Academy Registration from {name}:")
        print(f"Phone: {phone}")
        print(f"Email: {email}")
        print(f"Preferred Academy: {academy}")
        print(f"Question: {question or 'N/A'}\n")

        return jsonify(success=True, message="Registration submitted successfully!"), 200
    except Exception as e:
        print(f"Error handling academy registration: {e}")
        return jsonify(success=False, message="An error occurred."), 500


@app.route('/register-tournament', methods=['POST'])
def handle_tournament_registration():
    """Handles the tournament registration form from tournament.html."""
    try:
        data = request.json
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')
        tournament = data.get('tournament')
        message = data.get('message')
        
        # This data would be saved for tournament organizers.
        print(f"New Tournament Registration from Team Captain {name}:")
        print(f"Phone: {phone}")
        print(f"Email: {email}")
        print(f"Tournament: {tournament}")
        print(f"Note: {message or 'N/A'}\n")

        return jsonify(success=True, message="Registration submitted successfully!"), 200
    except Exception as e:
        print(f"Error handling tournament registration: {e}")
        return jsonify(success=False, message="An error occurred."), 500

@app.route('/subscribe', methods=['POST'])
def handle_newsletter_subscription():
    """Handles the newsletter subscription form from index.html."""
    try:
        data = request.json
        email = data.get('email')
        
        # The email would be added to a mailing list database.
        print(f"New Newsletter Subscription:")
        print(f"Email: {email}\n")
        
        return jsonify(success=True, message="Subscribed successfully!"), 200
    except Exception as e:
        print(f"Error handling newsletter subscription: {e}")
        return jsonify(success=False, message="An error occurred."), 500

if __name__ == '__main__':
    app.run(debug=True)