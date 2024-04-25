<form method="POST" action="{{ route('password.update') }}" style="background: hsl(213deg 85% 97%); padding: 2em; display: flex; flex-direction: column; border-radius: 30px; box-shadow: 0 0 2em hsl(231deg 62% 94%); max-width: 50%; margin: 20%; margin-top: 2%;">
    @csrf

    <input type="hidden" name="token" value="{{ $token }}">

    <div class="form-group" style="background: hsl(0deg 0% 100%); box-shadow: 0 0 2em hsl(231deg 62% 94%); padding: 1em; display: flex; flex-direction: column; gap: 0.5em; border-radius: 20px; color: hsl(0deg 0% 30%); margin-top: -3em; margin: 2%;">
        <label for="email" style="font-size: 0.9em;">Email Address</label>
        <input type="email" name="email" required autofocus style="outline: none; border: none; color: hsl(0deg 0% 0%); font-size: 0.9em;">
    </div>

    <div class="form-group" style="background: hsl(0deg 0% 100%); box-shadow: 0 0 2em hsl(231deg 62% 94%); padding: 1em; display: flex; flex-direction: column; gap: 0.5em; border-radius: 20px; color: hsl(0deg 0% 30%); margin: 2%;">
        <label for="password" style="font-size: 0.9em;">New Password</label>
        <input type="password" name="password" required style="outline: none; border: none; color: hsl(0deg 0% 0%); font-size: 0.9em;">
    </div>

    <div class="form-group" style="background: hsl(0deg 0% 100%); box-shadow: 0 0 2em hsl(231deg 62% 94%); padding: 1em; display: flex; flex-direction: column; gap: 0.5em; border-radius: 20px; color: hsl(0deg 0% 30%); margin: 2%;">
        <label for="password_confirmation" style="font-size: 0.9em;">Confirm New Password</label>
        <input type="password" name="password_confirmation" required style="outline: none; border: none; color: hsl(0deg 0% 0%); font-size: 0.9em;">
    </div>

    <div class="form-group" style="margin: 2%;">
        <button type="submit" style="padding: 1em; background: hsl(233deg 36% 38%); color: hsl(0 0 100); border: none; border-radius: 30px; font-weight: 600; cursor: pointer;">Reset Password</button>
    </div>
</form>
