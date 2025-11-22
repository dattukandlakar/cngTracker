import type { AuthUser } from '../store/authSlice';
import type { UserRole } from '../types/roles';
import { hasPermission } from '../types/roles';

/**
 * Check if user has manager permissions
 * @param user - The authenticated user
 * @returns boolean - true if user has manager or admin role
 */
export function isManager(user?: AuthUser): boolean {
  if (!user) return false;
  
  // Only managers can access the manager dashboard
  return user.role === 'manager';
}

/**
 * Check if user has operator permissions
 * @param user - The authenticated user
 * @returns boolean - true if user has operator role
 */
export function isOperator(user?: AuthUser): boolean {
  if (!user) return false;
  
  // Only operators can access the operator dashboard
  return user.role === 'operator';
}

/**
 * Check if user has specific permission
 * @param user - The authenticated user
 * @param permission - The permission to check
 * @returns boolean - true if user has the specified permission
 */
export function userHasPermission(user: AuthUser | undefined, permission: Parameters<typeof hasPermission>[1]): boolean {
  if (!user) return false;
  
  return hasPermission(user.role as UserRole, permission);
}

/**
 * Get user role display name
 * @param user - The authenticated user
 * @returns string - The display name of the user's role
 */
export function getUserRoleDisplayName(user?: AuthUser): string {
  if (!user) return 'Guest';
  
  switch (user.role) {
    case 'admin': return 'Administrator';
    case 'manager': return 'Manager';
    case 'operator': return 'Operator';
    case 'user': return 'User';
    default: return 'User';
  }
}