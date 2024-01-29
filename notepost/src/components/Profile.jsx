import './Profile.css'
const Profile = () => {

    // const [user, setUser] = useState({})
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const res = await axios.get('/api/users/profile')
    //             setUser(res.data)
    //             setLoading(false)
    //         } catch (err) {
    //             setError(err)
    //             setLoading(false)
    //         }
    //     }
    //     fetchUser()
    // }, [])

    // if (loading) return <p>Loading...</p>
    // if (error) return <p>{error.message}</p>
    return (
        <div className='profile_page'>
            <h1>Profile</h1>
            <div className='profile_container'>
                <div className='profile'>
                    {/* <h2>{user.name}</h2>
                    <p>{user.email}</p> */}
                    This is Profile page
                </div>
            </div>
        </div>
    )
}

export default Profile;