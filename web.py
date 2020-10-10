from flask import Flask, request, Response,render_template
from flask_request_params import bind_request_params
import pandas as pd
import holders
import crawler_api
import json

app = Flask(__name__)
app.before_request(bind_request_params)


@app.route('/')
def hello_world():
    # return 'Hello World!'
    df_holder,df_arr_holder = get_holders()
    dic_holder = {}
    dic_holder['index'] = df_arr_holder.tolist()
    dic_holder = [dic_holder]
    dic_holder = json.dumps(dic_holder)

    df_crawler, df_ar_crawler = get_crawler()
    dic_crawler = {}
    dic_crawler['index'] = df_ar_crawler.tolist()
    dic_crawler = [dic_crawler]
    dic_crawler = json.dumps(dic_crawler)

    return  render_template('test_copy.html', dic_holder=json.dumps(dic_holder),dic_crawler=json.dumps(dic_crawler))

@app.route('/holders', methods=['GET'])
def get_holders_df():
    #text = request.args.get('id')
    df_holder, df_arr_holder = get_holders()
    dic_holder = {}
    dic_holder['index'] = df_arr_holder.tolist()
    dic_holder = [dic_holder]
    dic_holder1 = json.dumps(dic_holder)
    return render_template('test_copy.html', dic_holder=json.dumps(dic_holder1))

@app.route('/crawler', methods=['GET'])
def get_crawler_df():
    #text = request.args.get('id')
    df_crawler, df_ar_crawler = get_crawler()
    dic_crawler = {}
    dic_crawler['index'] = df_ar_crawler.tolist()
    dic_crawler = [dic_crawler]
    dic_crawler1 = json.dumps(dic_crawler)
    return  render_template('test_copy.html',dic_crawler=json.dumps(dic_crawler1))

def get_holders():
    df = holders.run()
    return df

def get_crawler():
    df = crawler_api.run()
    return df

if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='0.0.0.0')