/**
 * Role-based Access Control (RBAC) Structure
 * 
 * This file defines the role structure for the CNG Tracker application.
 * Roles will be implemented in the future to control access to different features.
 */

export type UserRole = 'user' | 'admin' | 'operator' | 'manager';

/**
 * Role definitions with their permissions and descriptions
 */
export interface RoleDefinition {
  role: UserRole;
  displayName: string;
  description: string;
  permissions: Permission[];
}

/**
 * Available permissions in the system
 */
export type Permission =
  | 'view_pumps'
  | 'view_pump_details'
  | 'edit_pump_info'
  | 'manage_users'
  | 'view_reports'
  | 'manage_operations'
  | 'view_analytics'
  | 'manage_settings';

/**
 * Role definitions mapping
 */
export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  user: {
    role: 'user',
    displayName: 'User',
    description: 'Basic user with access to view pumps and get directions',
    permissions: ['view_pumps', 'view_pump_details'],
  },
  operator: {
    role: 'operator',
    displayName: 'Operator',
    description: 'Operator with access to manage operations and view reports',
    permissions: [
      'view_pumps',
      'view_pump_details',
      'manage_operations',
      'view_reports',
    ],
  },
  manager: {
    role: 'manager',
    displayName: 'Manager',
    description: 'Manager with access to analytics and operational management',
    permissions: [
      'view_pumps',
      'view_pump_details',
      'edit_pump_info',
      'manage_operations',
      'view_reports',
      'view_analytics',
    ],
  },
  admin: {
    role: 'admin',
    displayName: 'Administrator',
    description: 'Full system access including user management and settings',
    permissions: [
      'view_pumps',
      'view_pump_details',
      'edit_pump_info',
      'manage_users',
      'manage_operations',
      'view_reports',
      'view_analytics',
      'manage_settings',
    ],
  },
};

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_DEFINITIONS[role].permissions.includes(permission);
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_DEFINITIONS[role].permissions;
}

/**
 * Get role definition
 */
export function getRoleDefinition(role: UserRole): RoleDefinition {
  return ROLE_DEFINITIONS[role];
}

