interface IVideoRequest {
    video_id?: string;
    title?: string;
    description?: string;
    authorId?: string;
    originalname?: string;
    filename?: string;
    size?: number;
    url?: string | any;
}

export default IVideoRequest;
