'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ children, name, value, className = 'btn btn-primary' }: { children: React.ReactNode; name?: string; value?: string; className?: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" name={name} value={value} disabled={pending} className={className}>{pending ? 'Saving…' : children}</button>;
}

export function ConfirmButton({ children, message, className = 'btn btn-ghost' }: { children: React.ReactNode; message: string; className?: string }) {
  return <button type="submit" className={className} onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}>{children}</button>;
}
