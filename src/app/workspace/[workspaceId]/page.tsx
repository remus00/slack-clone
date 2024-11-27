interface Props {
    params: {
        workspaceId: string;
    };
}

const SingleWorkspacePage = ({ params }: Props) => {
    return <div>Id: {params.workspaceId}</div>;
};

export default SingleWorkspacePage;
