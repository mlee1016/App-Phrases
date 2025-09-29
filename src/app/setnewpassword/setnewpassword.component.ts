import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationUser } from '../emitters/emittters';
// import { ToastService } from '@/app/shared/toast/toast.service';

function matchPasswords(group: AbstractControl) {
  const np = group.get('new_password')?.value;
  const cp = group.get('confirm_new_password')?.value;
  return np && cp && np === cp ? null : { mismatch: true };
}
@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrl: './setnewpassword.component.css'
})
export class SetnewpasswordComponent {



  loading = false;

  form = this.fb.group({
    current_password: ['', [Validators.required]],
    new_password_group: this.fb.group({
      new_password: ['', [
        Validators.required,
        Validators.minLength(8),
        // Optionally enforce complexity:
        // Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
      ]],
      confirm_new_password: ['', [Validators.required]],
    }, { validators: matchPasswords })
  });

  constructor(
    private fb: FormBuilder,
    private api: AuthenticationUser
    // private toast: ToastService
  ) {}

  get f() { return this.form.controls as any; }
  get g() { return (this.form.get('new_password_group') as any).controls; }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    const payload = {
      current_password: this.f.current_password.value,
      new_password: this.g.new_password.value,
      confirm_new_password: this.g.confirm_new_password.value,
    };

    this.api.setPassword(payload).subscribe({
      next: (res) => {
        console.log('success', res.detail || 'Password updated.');
        this.form.reset();
        this.loading = false;
      },
      error: (err) => {
        // Map common backend errors to form controls
        const data = err?.error || {};
        if (data.current_password) this.f.current_password.setErrors({ server: data.current_password });
        if (data.confirm_new_password) this.g.confirm_new_password.setErrors({ server: data.confirm_new_password });
        if (typeof data === 'object' && data.detail) console.log('error', data.detail);
        else console.log('error', 'Could not update password.');
        this.loading = false;
      }
    });
  }



}
