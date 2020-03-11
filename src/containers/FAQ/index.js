import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import PageHeader from '../../components/PageTitle';
import './faq.css';

class FAQ extends Component {
  render() {
    return (
      <div className="padding faq-page">
        <PageHeader title={'Frequently Asked Questions'}/>
        <div>
          <List>
            <ListItem
              primaryText="How much does it costs"
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} primaryText={
                  <Paper zDepth={3} style={{ padding: 12 }}>
                    <p>
                      Nothing. If everything goes super, we might charge something in the future. But for now, this is a
                      hobby and should be treated as such.
                    </p>
                  </Paper>
                }/>
              ]}
            />
            <Divider/>
            <ListItem
              primaryText="What kind of data are we talking about?"
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} primaryText={
                  <Paper zDepth={3} style={{ padding: 12 }}>
                    <p>
                      When you start an activity on your Apple Watch (or similar), such as running, it will track for
                      instance your speed, distance, heart rate and time.
                    </p>
                  </Paper>
                }/>
              ]}
            />
            <Divider/>
            <ListItem
              primaryText="What equipment, software and platforms do you support?"
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} primaryText={
                  <Paper zDepth={3} style={{ padding: 12 }}>
                    <p>
                      Right now you can export data from Apple Health database that is on your iphone. Various sport
                      watches (such as the Apple Watch) and bands store data there.
                    </p>

                    <p>
                      Right now it is not possible to upload data from an Android phone.&nbsp;

                      <a href="https://www.wareable.com/apple/apps-that-work-with-apple-health-kit-compatible">
                        Here is a nice article about different gear that works with Apple Health (and with Sports Performance Reports):
                      </a>
                    </p>
                  </Paper>
                }/>
              ]}
            />
            <Divider/>
            <ListItem
              primaryText="Is this service a security risk for my personal information?"
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} primaryText={
                  <Paper zDepth={3} style={{ padding: 12 }}>
                    <p>
                      Absolutely not! All data is stored anonymously and you may access it only through an unique link
                      with your own ID. You may delete your data at any time. Your data cannot be used to track you or
                      use against you. Data only tells that “someone did some running”.
                    </p>
                  </Paper>
                }/>
              ]}
            />
            <Divider/>
            <ListItem
              primaryText="Nothing synchronizes to Sports Performance Reports?"
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} primaryText={
                  <Paper zDepth={3} style={{ padding: 12 }}>
                    <p>
                      Do you have an app or a sports watch / band that records workout activities? Have you started an
                      activity manually when you do sports? Does an activity record show in the Apple Health app on
                      your iPhone (or the Activity app)?
                    </p>

                    <p>
                      If you’re 100% sure that you have recorded activities on your phone, but cannot upload to Sports
                      Performance Reports and can’t get a unique link on the sync app, please do <b>leave us a bug report</b>
                    </p>
                  </Paper>
                }/>
              ]}
            />
            <Divider/>
            <ListItem
              primaryText="Who created this?"
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem key={1} primaryText={
                  <Paper zDepth={3} style={{ padding: 12 }}>
                    <p>
                      An entrepreneuer from Finland who is into sports!
                    </p>
                  </Paper>
                }/>
              ]}
            />
          </List>
        </div>
      </div>
    )
  }
}

export default FAQ;
