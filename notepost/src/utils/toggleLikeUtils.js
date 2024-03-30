const handleToggleLike = async (notepostId, token, setNoteposts, toast) => {
    try {
        const response = await fetch(`https://sayit-api.onrender.com/toggle_like/like`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            'body': JSON.stringify({ notepostId }),
            'credentials': 'include'
        })
        if (response.status === 200) {
            const responseData = await response.json();
            const { updatedNotepost } = responseData;

            setNoteposts((noteposts) =>
                noteposts.map((notepost) =>
                    notepost.notepostId === notepostId
                        ? { ...notepost, likedBy: updatedNotepost.likedBy, likeCount: updatedNotepost.likeCount }
                        : notepost
                )
            );
        } else {
            console.log('Error updating like')
            toast.error('Oops! Something went wrong. Please try again.')

        }

    } catch (error) {
        console.error('Error updating like', error)
        toast.error('Oops! Something went wrong. Please try again.')
    }
}

export default handleToggleLike;