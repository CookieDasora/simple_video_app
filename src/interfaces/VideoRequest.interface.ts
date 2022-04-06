interface IVideoRequest {
    video_id?: string;
    title?: string;
    description?: string;
    authorId?: string;
    categoryId?: string;
    url?: string | any;
    filename?: string;
}

export default IVideoRequest;
