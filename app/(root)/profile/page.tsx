import React from 'react';

const ProfilePage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Scholar Stack</h1>
        <nav style={styles.nav}>
          <a href="/">Home</a>
          <a href="/books">Books</a>
          <a href="/upload">Upload Book</a>
          <a href="/chats">Chats</a>
        </nav>
      </header>
      
      <main style={styles.main}>
        <section style={styles.profileSection}>
          <h2>Username: NaleenKhan</h2>
          <button>Edit Profile</button>
          <p>Bio: Book Lover</p>
          <button>Edit Profile</button>
          <p>Location: Douglasdale</p>
          <p>Status: Active</p>
        </section>
        

        <section style={styles.statsSection}>
          <h2>Statistics</h2>
          <p>Joined ScholarStack: June 04, 2024</p>
          <p>Listings Completed: 37</p>
          <p>Ongoing Listings: 04</p>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    gap: '10px',
  },
  main: {
    display: 'flex',
    gap: '20px',
  },
  profileSection: {
    flex: 1,
    borderRight: '1px solid #ccc',
    paddingRight: '20px',
  },
  listingsSection: {
    flex: 2,
  },
  listing: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  statsSection: {
    flex: 1,
    borderLeft: '1px solid #ccc',
    paddingLeft: '20px',
  },
};

export default ProfilePage;
