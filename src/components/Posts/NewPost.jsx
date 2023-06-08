import React from 'react';
import postService from '../../services/posts.js';
function NewPost({ user }) {
  const [caption] = useState('');
  const [hashtags] = useState('');
  const [content] = useState('');
  const [mediaURL] = useState('');
  const [redirect] = useState(false);
  const handleCreatePost = () => {
    const post = getPostFromForm();
    postService.createPost(post);
  };

  const getPostFromForm = () => {
    // TODO: Get post from the form
    const data = new FormData();
    data.set('caption', caption);
    data.set('hashtags', hashtags);
    data.set('content', content);
    data.set('mediaURL', mediaURL);
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <Form>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Caption
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="caption" placeholder="Caption" />
    </Col>
  </Form.Group>
  <Form>
  <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Add image" />
  </Form.Group>
  </Form>
  <Form.Group as={Row} controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
      Hashtags
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="hashtags" placeholder="Hashtags" />
    </Col>
  </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Submit</Button>
          </Col>
      </Form.Group>
    </Form>
  );
}

export default NewPost;
