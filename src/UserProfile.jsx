function UserProfile({ name, jobTitle }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{jobTitle}</p>
        </div>
    );
}

export default UserProfile; // Don't forget to export it!