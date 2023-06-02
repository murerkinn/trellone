import { Unauthorized } from 'http-errors'

import acl from '.'

const init = async () => {
  console.log('Initializing ACL Manager')

  await generateUserPermissions()

  console.log('ACL Manager initialized')
}

const generateUserPermissions = async () => {
  return acl.allow([
    {
      roles: 'role:user',
      allows: [
        {
          resources: 'resource:board',
          permissions: ['create'],
        },
      ],
    },
  ])
}

const generatePermissionsForBoard = async (userId: string, boardId: string) => {
  const boardAdminRole = `role:board-admin:${boardId}`
  const boardUserRole = `role:board-user:${boardId}`
  const boardResource = `resource:board:${boardId}`

  await acl.allow([
    {
      roles: boardUserRole,
      allows: [
        {
          resources: boardResource,
          permissions: ['read'],
        },
      ],
    },
    {
      roles: boardAdminRole,
      allows: [
        {
          resources: boardResource,
          permissions: ['update', 'delete', 'invite-member'],
        },
      ],
    },
  ])

  await acl.addRoleParents(boardAdminRole, [boardUserRole])

  await acl.addUserRoles(userId, boardAdminRole)
}

const checkIsAllowed = async (
  userId: string,
  resource: string,
  permission: string
) => {
  const isAllowed = await acl.isAllowed(userId, resource, permission)

  if (!isAllowed) throw new Unauthorized()

  return isAllowed
}

const ACLManager = {
  init,
  generatePermissionsForBoard,
  checkIsAllowed,
}

export default ACLManager
