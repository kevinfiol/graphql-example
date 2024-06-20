export const AllUsers = `
  query AllUsers {
    users {
      rowid
      firstname
      lastname
      title
      email
    }
  }
`;

export const UserInfo = `
  query UserInfo($rowid: Int!) {
    users(rowid: $rowid) {
      rowid
      firstname
      lastname
      age
      email
      title
      description
      profile
    }
  }
`;

export const UpdateUserInfo = `
  mutation UpdateUserInfo(
    $rowid: Int!
    $firstname: String
    $lastname: String
    $email: String
    $title: String
    $description: String
    $profile: String
  ) {
    updateUser(
      rowid: $rowid
      firstname: $firstname
      lastname: $lastname
      email: $email
      title: $title
      description: $description
      profile: $profile
    ) {
      rowid
      firstname
      lastname
      age
      email
      title
      description
      profile
    }
  }
`;