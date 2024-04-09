<form method="POST" action="{{ route('password.update') }}">
    @csrf

    <input type="hidden" name="token" value="{{ $token }}">

    <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" name="email" required autofocus>
    </div>

    <div class="form-group">
        <label for="password">New Password</label>
        <input type="password" name="password" required>
    </div>

    <div class="form-group">
        <label for="password_confirmation">Confirm New Password</label>
        <input type="password" name="password_confirmation" required>
    </div>

    <div class="form-group">
        <button type="submit">Reset Password</button>
    </div>
</form>
