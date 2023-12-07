from flask import Flask, request, jsonify, session, send_file, render_template
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key_here' 
CORS(app)

# In-memory user store
users = {
    'user1': 'password1',
    # Add more users here
}

@app.route('/login')
def login():
    print(session)
    if 'username' in session:
        return dashboard()
    
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if users.get(username) == password:
        session['username'] = username

        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/logout', methods=['POST'])
def logout():
    # Clear user session
    session.pop('username', None)
    return jsonify({'message': 'Logout successful'})

@app.route('/')
def home():
    # Check if user is logged in
    return render_template('index.html')


@app.route('/dashboard')
def dashboard():
    # Check if user is logged in
    if 'username' in session:
        # Get the username from the session
        username = session['username']
        # Serve the dashboard.html file
        return render_template('dashboard.html')
    else:
        return jsonify({'message': 'You are not logged in'}), 401



if __name__ == '__main__':
    app.run(debug=True)
