import React, {Component} from 'react';
import {Button, Form, TextArea,  Container, } from 'semantic-ui-react'

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: true,
      colorButton: 'red'
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.value.length === 0) {
      this.setState({
          showButton: true,
          colorButton: 'red',
        })
    } else {
      this.setState({
        showButton: false,
        colorButton: 'green',
      })
    }
  }



render()
{
  return (

      <Form>
        <Form.Field control={TextArea}
                    placeholder='Введите коментарий'
                    onChange={this.onChange}
        />
        <Button
          inverted color={this.state.colorButton}
          disabled={this.state.showButton}
          style={{marginBottom: '20px'}}>Добавить коментарий</Button>
        {/*<Form.Field control={Button} inverted  style={{marginBottom: '20px'}}>Добавить коментарий</Form.Field>*/}

      </Form>

  );
}
}

export default CommentForm;